import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import {createEvent, deleteEvent, updateEvent} from "../eventActions";
import {connect} from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

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
        <EventActivity/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(EventDashboard);
