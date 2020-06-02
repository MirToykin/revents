import React, {useEffect} from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {connect} from "react-redux";
import {withFirestore} from "react-redux-firebase";
import {toastr} from "react-redux-toastr";
import {objectToArray} from "../../../app/common/util/helpers";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  const events = state.firestore.ordered.events;

  if (events && events.length) {
    event = events.filter(event => eventId === event.id)[0] || {};
  }

  return {event}
};

const EventDetailedPage = ({firestore, match, history, event}) => {
  const eventId = match.params.id;
  const attendees = event && event.attendees && objectToArray(event.attendees);

  useEffect(() => {
    (async () => {
      const event = await firestore.get(`events/${eventId}`);
      if (!event.exists) {
        history.push('/events');
        toastr.error('Oops', 'Event not exist')
      }
    })();
  }, [eventId, firestore, history]); // firestore и history включил т.к. было предупреждение в терминале

  if (!Object.values(event).length) return <p>Loading...</p>

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat/>
      </GridColumn>
      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default withFirestore(connect(mapState)(EventDetailedPage));
