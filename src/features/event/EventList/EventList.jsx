import React from 'react';
import EventListItem from "./EventListItem";

const EventList = ({events, deleteEvent}) => {
  return (
    <>
      {events.map((event) => <EventListItem event={event}
                                            key={event.id}
                                            deleteEvent={deleteEvent}
      />)}
    </>
  );
};

export default EventList;
