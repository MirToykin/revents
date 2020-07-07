import React from 'react';
import EventListItem from "./EventListItem";
import InfiniteScroll from 'react-infinite-scroller';

const EventList = ({events, getNextEvents, moreEvents, loading}) => {
  return (
    <>
      { events && events.length !== 0 &&
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {events && events.map((event) => <EventListItem event={event}
                                                          key={event.id}
          />)}
        </InfiniteScroll>
      }
    </>
  );
};

export default EventList;
