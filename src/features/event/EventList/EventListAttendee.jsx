import React from 'react';
import {Image, List} from "semantic-ui-react";

const EventListAttendee = () => {
  return (
    <List.Item>
      <Image as='a' circular size='mini' src='https://randomuser.me/api/portraits/women/42.jpg'/>
    </List.Item>
  );
};

export default EventListAttendee;
