import React from 'react';
import {Grid, GridColumn} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSideBar from "./EventDetailedSideBar";
import {connect} from "react-redux";

const mapState = (state, ownPops) => {
  const eventId = ownPops.match.params.id;
  let event = {};

  if (eventId && state.events.length) {
    event = state.events.filter(event => eventId === event.id)[0];
  }

  return {event};
};

const EventDetailedPage = ({event}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat/>
      </GridColumn>
      <Grid.Column width={6}>
        <EventDetailedSideBar event={event}/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(EventDetailedPage);
