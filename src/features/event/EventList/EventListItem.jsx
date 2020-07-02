import React from 'react';
import {Button, Icon, Item, List, Segment, Label} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {objectToArray} from "../../../app/common/util/helpers";

const EventListItem = ({event}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>{event.title}</Item.Header>
              <Item.Description>
                Hosted by <Link to={`/people/${event.hostUid}`}>{event.hostedBy}</Link>
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
          {event.attendees && objectToArray(event.attendees).map((attendee) => <EventListAttendee attendee={attendee} key={attendee.id}/>)}
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
