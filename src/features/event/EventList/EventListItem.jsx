import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

const EventListItem = ({event, selectEvent, deleteEvent}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header as="a" href='#' >{event.title}</Item.Header>
              <Item.Description>
                Hosted by <a href='#'>{event.hostedBy}</a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
          <span>
            <Icon name="clock"/> {event.date} |
            <Icon name="marker"/> {event.venue}
          </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees && event.attendees.map((attendee) => <EventListAttendee attendee={attendee} key={attendee.id}/>)}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button onClick={() => deleteEvent(event.id)} as="a" color="red" floated="right" content="Delete"/>
        <Button onClick={() => selectEvent(event)} as="a" color="teal" floated="right" content="View"/>
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;