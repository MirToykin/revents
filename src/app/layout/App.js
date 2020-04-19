import React from 'react';
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import {Container} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import HomePage from "../../features/Home/HomePage";
import EventDetailedPage from "../../features/event/EventDetailed/EeventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/settings/SettingsDasboard";
import EventForm from "../../features/event/EventForm/EventForm";

const App = () => {
  return (
    <>
      <Route path='/' exact component={HomePage}/>
      <Route path='/(.+)' render={() => (
        <>
          <NavBar/>
          <Container className='main'>
            <Route path='/events' component={EventDashboard}/>
            <Route path='/events/:id' component={EventDetailedPage}/>
            <Route path='/people' component={PeopleDashboard}/>
            <Route path='/people/:id' component={UserDetailedPage}/>
            <Route path='/settings' component={SettingsDashboard}/>
            <Route path='/createEvent' component={EventForm}/>
          </Container>
        </>
      )}/>
    </>
  );
}

export default App;
