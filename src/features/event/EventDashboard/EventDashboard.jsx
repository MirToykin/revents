import React, {useState} from 'react';
import {Button, Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from 'cuid';
import {createEvent, deleteEvent, updateEvent} from "../eventActions";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     createEvent: (event) => dispatch(createEvent(event)),
//     updateEvent: (event) => dispatch(updateEvent(event)),
//     deleteEvent: (eventId) => dispatch(deleteEvent(eventId))
//   }
// }
const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

const EventDashboard = ({events, createEvent, updateEvent, deleteEvent}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    createEvent(newEvent);
  };

  const handleUpdateEvent = (updatedEvent) => {
    updateEvent(updatedEvent);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleFormOpen = () => {
    setIsOpen(true);
    setSelectedEvent(null);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={handleDeleteEvent} events={events} selectEvent={handleSelectEvent}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <Button onClick={handleFormOpen} positive content= 'Create Event'/>
        {isOpen && <EventForm close={() => setIsOpen(false)}
                              createEvent={handleCreateEvent}
                              updateEvent={handleUpdateEvent}
                              selectedEvent={selectedEvent}
                              setSelectedEvent={setSelectedEvent}
                              key={selectedEvent ? selectedEvent.id : 0}
        />}
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(EventDashboard);
