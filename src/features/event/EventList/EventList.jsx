import React from 'react';
import EventListItem from "./EventListItem";

const EventList = ({events}) => {
  return (
    <>
      {events && events.map((event) => <EventListItem event={event}
                                            key={event.id}
      />)}
    </>
  );
};

export default EventList;
