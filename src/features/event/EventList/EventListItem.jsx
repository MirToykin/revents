import React from 'react';
import {Button, Icon, Item, List, Segment, Label} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import {Link} from "react-router-dom";
import {format} from "date-fns";

const EventListItem = ({event}) => {
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
              {event.cancelled && <Label
                style={{top: '-40px'}}
                ribbon='right'
                color='red'
                content='This event has been cancelled'
              />}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
          <span>
            <Icon name="clock"/> {format(event.date.toDate(), 'EEEE do LLL')} at {format(event.date.toDate(), 'h:mm a')} |
            <Icon name="marker"/> {event.venue}
          </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees && Object.values(event.attendees).map((attendee, index) => <EventListAttendee attendee={attendee} key={index}/>)}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View"/>
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
