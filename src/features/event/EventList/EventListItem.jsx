import React from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import {Link} from "react-router-dom";
import {format, parseISO} from "date-fns";

const EventListItem = ({event, deleteEvent}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>
                Hosted by <span>{event.hostedBy}</span>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
          <span>
            <Icon name="clock"/> {format(parseISO(event.date), 'EEEE do LLL')} at {format(parseISO(event.date), 'h:mm a')} |
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
        <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View"/>
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
