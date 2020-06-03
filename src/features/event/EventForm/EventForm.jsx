import React, {useEffect} from 'react';
import {Button, Form, Grid, GridColumn, Header, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {cancelToggle, createEvent, updateEvent} from "../eventActions";
import {Field, reduxForm} from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import {combineValidators, composeValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import DateInput from "../../../app/common/form/DateInput";
import {compose} from "redux";
import {withFirestore} from "react-redux-firebase";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  const events = state.firestore.ordered.events;

  if (events && events.length) {
    event = events.filter(event => eventId === event.id)[0] || {};
  }

  return {
    initialValues: event,
    event
  };
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'The category is required'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Descriptions needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

const EventForm = ({createEvent, updateEvent, cancelToggle,
                    history, handleSubmit, match, event,
                    initialValues, firestore}) => {
  const eventId = match.params.id;

  useEffect(() => {
    (async () => {
      await firestore.setListener(`events/${eventId}`);
    })();

    return async () => {
      await firestore.unsetListener(`events/${eventId}`);
    }
  }, [eventId, firestore, history]); // firestore и history включил т.к. было предупреждение в терминале

  const onFormSubmit = async (values) => {
    if (initialValues.id) {
      updateEvent(values);
      history.push(`/events/${initialValues.id}`);
    } else {
      const createdEvent = await createEvent(values);
      history.push(`/events/${createdEvent.id}`)
    }
  };

  return (
    <Grid textAlign='center'>
      <GridColumn width={10}>
        <Segment>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Header sub color='teal' content='Event Details'/>
            <Field name='title' component={TextInput} placeholder='Give your event a name'/>
            <Field name='category'
                   component={SelectInput}
                   placeholder='What is your event about?'
                   options={category}
            />
            <Field name='description'
                   rows={3} component={TextArea}
                   placeholder='Tell us about your event'
            />
            <Header sub color='teal' content='Event Location Details' style={{marginTop: '0'}}/>
            <Field name='city' component={TextInput} placeholder='Event City'/>
            <Field name='venue' component={TextInput} placeholder='Event Venue'/>
            <Field name='date'
                   component={DateInput}
                   placeholder='Event Date'
                   dateFormat='dd LLL yyyy HH:mm'
                   showTimeSelect
                   timeFormat='HH:mm'
            />
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button"
                    onClick={initialValues.id ?
                      () => history.push(`/events/${initialValues.id}`) :
                      () => history.push(`/events`)
                    }
            >Cancel</Button>
            {initialValues.id && <Button
              type='button'
              color={event.cancelled ? 'green' : 'red'}
              content={event.cancelled ? 'Reactivate event' : 'Cancel event'}
              floated='right'
              onClick={() => cancelToggle(!event.cancelled, event.id)}
            />}
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default compose(
  withFirestore,
  connect(mapState, actions),
  (reduxForm({form: 'eventForm', validate, enableReinitialize: true}))
)(EventForm);