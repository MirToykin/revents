import React, {useState} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import cuid from "cuid";
import {createEvent, updateEvent} from "../eventActions";

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
  const {title, date, city, venue, hostedBy} = formFields;

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

  const handleFormFieldChange = (e) => {
    const {name, value} = e.target;
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Event Title</label>
          <input name='title' value={title} onChange={handleFormFieldChange} placeholder="Title"/>
        </Form.Field>
        <Form.Field>
          <label>Event Date</label>
          <input name='date' value={date} onChange={handleFormFieldChange} type="date"
                 placeholder="Event Date"/>
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input name='city' value={city} onChange={handleFormFieldChange}
                 placeholder="City event is taking place"/>
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <input name='venue' value={venue} onChange={handleFormFieldChange}
                 placeholder="Enter the Venue of the event"/>
        </Form.Field>
        <Form.Field>
          <label>Hosted By</label>
          <input name='hostedBy' value={hostedBy} onChange={handleFormFieldChange}
                 placeholder="Enter the name of person hosting"/>
        </Form.Field>
        <Button positive type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button type="button" onClick={history.goBack}>Cancel</Button>
      </Form>
    </Segment>
  );
};

export default connect(mapState, actions)(EventForm);
