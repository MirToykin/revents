import React from 'react';
import {Item, Label, List, Segment} from "semantic-ui-react";

const EventDetailedSideBar = ({event: {attendees}}) => {

  const isHosted = false;

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
        {attendees.length ? `${attendees.length} ${attendees.length === 1 ? 'Person' : 'People'} Going` : 'Nobody Going Yet'}
      </Segment>
      <Segment attached>
        <List relaxed divided>
        {attendees && attendees.map(attendee => (
            <Item key={attendee.id} style={{ position: 'relative' }}>
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
                  <a>{attendee.name}</a>
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
