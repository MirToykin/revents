import React from 'react';
import {Image, List} from "semantic-ui-react";

const EventListAttendee = ({attendee}) => {
  return (
    <List.Item>
      <Image as='a' circular size='mini' src={attendee.photoURL}/>
    </List.Item>
  );
};

export default EventListAttendee;
