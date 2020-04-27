import React from 'react';
import {Item, Label, List, Segment} from "semantic-ui-react";

const EventDetailedSideBar = ({event: {attendees}}) => {

  const isHosted = false;
  const attendeesArr = Object.values(attendees);

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendeesArr.length ? `${attendeesArr.length} ${attendeesArr.length === 1 ? 'Person' : 'People'} Going` : 'Nobody Going Yet'}
      </Segment>
      <Segment attached>
        <List relaxed divided>
        {attendeesArr && attendeesArr.map((attendee, index) => (
            <Item key={index} style={{ position: 'relative' }}>
              {isHosted && <Label
                style={{ position: 'absolute' }}
                color="orange"
                ribbon="right"
              >
                Host
              </Label>}
              <Item.Image size="tiny" src={attendee.photoURL} />
              <Item.Content style={{width: 'auto'}} verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.name}</span>
                </Item.Header>
              </Item.Content>
            </Item>
        ))}
        </List>
      </Segment>
    </>
  );
};

export default EventDetailedSideBar;
