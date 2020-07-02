import React from 'react';
import {Image, List} from "semantic-ui-react";
import {Link} from "react-router-dom";

const EventListAttendee = ({attendee}) => {
  return (
    <List.Item>
      <Image as={Link} to={`/people/${attendee.id}`} circular size='mini' src={attendee.photoURL}/>
    </List.Item>
  );
};

export default EventListAttendee;
