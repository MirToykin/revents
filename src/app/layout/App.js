import React from 'react';
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import {Container} from "semantic-ui-react";

const App = () => {
  return (
    <React.StrictMode>
      <NavBar/>
      <Container className='main'>
        <EventDashboard/>
      </Container>
    </React.StrictMode>
  );
}

export default App;
