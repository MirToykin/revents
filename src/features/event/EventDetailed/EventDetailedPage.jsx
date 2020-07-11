import React, {useEffect} from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {connect} from "react-redux";
import {withFirestore} from "react-redux-firebase";
import {objectToArray, createDataTree} from "../../../app/common/util/helpers";
import {goingToEvent, cancelGoingToEvent} from "../../user/userActions";
import {addEventComment} from "../eventActions";
import {firebaseConnect, isEmpty} from "react-redux-firebase";
import {compose} from 'redux'

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  const events = state.firestore.ordered.events;

  if (events && events.length) {
    event = events.filter(event => eventId === event.id)[0] || {};
  }

  return {
    event,
    auth: state.firebase.auth,
    eventChat: !isEmpty(state.firebase.data.events_chat) &&
      objectToArray(state.firebase.data.events_chat[eventId])
  }
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
}

const EventDetailedPage = ({
                             firestore, match, history,
                             event, auth, goingToEvent,
                             cancelGoingToEvent, addEventComment,
                             eventChat
                           }) => {
  const eventId = match.params.id;
  const attendees = event && event.attendees && objectToArray(event.attendees);
  const isHost = event.hostUid === auth.uid;
  const isGoing = attendees && attendees.some(a => a.id === auth.uid);
  const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

  useEffect(() => {
    (async () => {
      await firestore.setListener(`events/${eventId}`);
    })();

    return async () => {
      await firestore.unsetListener(`events/${eventId}`);
    }
  }, [eventId, firestore, history]); // firestore и history включил т.к. было предупреждение в терминале

  if (!Object.values(event).length) return <p>Loading...</p>

  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailedHeader event={event}
                             isHost={isHost}
                             isGoing={isGoing}
                             goingToEvent={goingToEvent}
                             cancelGoingToEvent={cancelGoingToEvent}
        />
        <EventDetailedInfo event={event}/>
        <EventDetailedChat addEventComment={addEventComment} eventId={event.id} eventChat={chatTree}/>
      </GridColumn>
      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default compose(withFirestore,
  connect(mapState, actions),
  firebaseConnect(props => [`events_chat/${props.match.params.id}`])
)(EventDetailedPage);
