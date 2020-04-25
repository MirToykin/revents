import React, {useState} from 'react';
import {Button, Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import {createEvent, deleteEvent, updateEvent} from "../eventActions";
import {connect} from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapStateToProps = (state) => {
  return {
    events: state.events,
    loading: state.async.loading
  }
}
const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

const EventDashboard = ({events, deleteEvent, loading}) => {
  if(loading) return <LoadingComponent inverted={false}/>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={deleteEvent} events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activities</h2>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(EventDashboard);
