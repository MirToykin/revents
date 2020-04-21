import React, {useState} from 'react';
import {Button, Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import {createEvent, deleteEvent, updateEvent} from "../eventActions";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}
const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

const EventDashboard = ({events, deleteEvent}) => {

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={handleDeleteEvent} events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activities</h2>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(EventDashboard);
