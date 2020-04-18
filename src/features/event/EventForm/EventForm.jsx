import React, {useEffect, useState} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";

const EventForm = ({close, createEvent, updateEvent, selectedEvent, setSelectedEvent}) => {
  const [formFields, setFormFields] = useState({
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  });

  useEffect(() => {
    if(selectedEvent) setFormFields(selectedEvent);
  }, [selectedEvent]);

  const {title, date, city, venue, hostedBy} = formFields;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent) {
      updateEvent({...formFields});
      setSelectedEvent(null);
    } else {
      createEvent({...formFields});
    }
    close();
  };

  const handleFormFieldChange = (e) => {
    const {name, value} = e.target;
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleCancel = () => {
    close();
    setSelectedEvent(null);
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
        <Button type="button" onClick={handleCancel}>Cancel</Button>
      </Form>
    </Segment>
  );
};

export default EventForm;
