import React, {useState} from 'react';
import {Button, Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from 'cuid';

const eventsFromDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];


const EventDashboard = () => {
  const [events, setEvents] = useState(eventsFromDashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    setEvents((prevEvents) => {
      return [...prevEvents, newEvent];
    });
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events => {
      return events.map(event => {
        if (event.id === updatedEvent.id) {
          return {...updatedEvent};
        } else {
          return event;
        }
      })
    })
  };

  const handleDeleteEvent = (id) => {
    setEvents(events => {
      return events.filter(event => {
        return event.id !== id;
      })
    })
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

export default EventDashboard;
