import React, {useEffect, useRef, useState} from 'react';
import {Grid, Loader} from "semantic-ui-react";
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
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const initialMount = useRef(true);

  useEffect(() => {
    (async () => {
      let next = await  getEventsForDashboard();
      if (next && next.docs && next.docs.length > 1) {
        setMoreEvents(true);
        setLoadingInitial(false);
      }
    })();
  }, [getEventsForDashboard])

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setLoadedEvents((loadedEvents) => {
        return [...loadedEvents, ...events];
      })
    }
  }, [events])

  const getNextEvents = async () => {
    let lastEvent = loadedEvents && loadedEvents[loadedEvents.length -1];
    let next = await getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length < 1) {
      setMoreEvents(false);
    }
  }

  if(loadingInitial) return <LoadingComponent inverted={false}/>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={loadedEvents}
          loading={loading}
          getNextEvents={getNextEvents}
          moreEvents={moreEvents}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading}/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(firestoreConnect([{collection: 'events'}])(EventDashboard));
