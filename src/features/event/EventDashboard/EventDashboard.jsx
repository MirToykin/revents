import React, {useEffect, useState} from 'react';
import {Button, Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import {getEventsForDashboard} from "../eventActions";
import {connect} from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import {firestoreConnect} from "react-redux-firebase";

const mapStateToProps = (state) => {
  return {
    events: state.events,
    loading: state.async.loading
  }
}
const actions = {
  getEventsForDashboard
}

const EventDashboard = ({events, loading, getEventsForDashboard}) => {
  const [moreEvents, setMoreEvents] = useState(false);
  useEffect(() => {
    (async () => {
      let next = await  getEventsForDashboard();
      if (next && next.docs && next.docs.length >= 1) {
        setMoreEvents(true);
      }
    })();
  }, [getEventsForDashboard])

  const getNextEvents = async () => {
    let lastEvent = events && events[events.length -1];
    let next = await getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length < 1) {
      setMoreEvents(false);
    }
  }

  if(loading) return <LoadingComponent inverted={false}/>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events}/>
        <Button onClick={getNextEvents} disabled={!moreEvents} color='green' floated='right' content='More'/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));
