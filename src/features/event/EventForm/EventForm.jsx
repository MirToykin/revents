import React, {useState} from 'react';
import {Button, Form, Grid, GridColumn, Header, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import cuid from "cuid";
import {createEvent, updateEvent} from "../eventActions";
import {Field, reduxForm} from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import Textarea from "../../../app/common/form/Textarea";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length) {
    event = state.events.filter(event => eventId === event.id)[0];
  }

  return {event};
}

const actions = {
  createEvent,
  updateEvent
}

const EventForm = ({createEvent, updateEvent, event, history}) => {

  const [formFields, setFormFields] = useState(event);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.id) {
      updateEvent({...formFields});
      history.goBack();
    } else {
      const newEvent = {
        ...formFields,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        attendees: [],
        description: ''
      };

      createEvent(newEvent);
      history.push(`/events/`)
    }
  };

  return (
    <Grid textAlign='center'>
      <GridColumn width={10}>
        <Segment>
          <Form>
            <Header sub color='teal' content='Event Details'/>
            <Field name='title' component={TextInput} placeholder='Give your event a name'/>
            <Field name='category' component={TextInput} placeholder='What is your event about?'/>
            <Field name='description' rows={3} component={Textarea} placeholder='Tell us about your event'/>
            <Header sub color='teal' content='Event Location Details'/>
            <Field name='city' component={TextInput} placeholder='Event City'/>
            <Field name='venue' component={TextInput} placeholder='Event Venue'/>
            <Field name='date' component={TextInput} placeholder='Event Date'/>
            <Button positive type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Button type="button" onClick={history.goBack}>Cancel</Button>
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default connect(mapState, actions)(reduxForm({form: 'eventForm'})(EventForm));
