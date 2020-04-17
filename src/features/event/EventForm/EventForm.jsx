import React from 'react';
import {Button, Form, Segment} from "semantic-ui-react";

const EventForm = ({close}) => {
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Event Title</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Event Date</label>
          <input type="date" placeholder="Event Date" />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input placeholder="City event is taking place" />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <input placeholder="Enter the Venue of the event" />
        </Form.Field>
        <Form.Field>
          <label>Hosted By</label>
          <input placeholder="Enter the name of person hosting" />
        </Form.Field>
        <Button positive type="submit" onClick={close}>
          Submit
        </Button>
        <Button type="button" onClick={close}>Cancel</Button>
      </Form>
    </Segment>
  );
};

export default EventForm;
