import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import {createEvent, updateEvent} from "../eventActions";
import {connect} from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import {firestoreConnect, isLoaded} from "react-redux-firebase";

const mapStateToProps = (state) => {
  return {
    events: state.firestore.ordered.events
  }
}
const actions = {
  createEvent,
  updateEvent
}

const EventDashboard = ({events}) => {
  if(!isLoaded(events)) return <LoadingComponent inverted={false}/>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));
