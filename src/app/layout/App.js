import React from 'react';
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import {Container} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import HomePage from "../../features/Home/HomePage";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/settings/SettingsDasboard";
import EventForm from "../../features/event/EventForm/EventForm";
import {withRouter} from "react-router-dom";
import ModalManager from "../../features/modals/ModalManager";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";

const App = ({location: {key}}) => {
  return (
    <>
      <ModalManager/>
      <Route path='/' exact component={HomePage}/>
      <Route path='/(.+)' render={() => (
        <>
          <NavBar/>
          <Container className='main'>
            <Switch key={key}>
              <Route path='/events' exact component={EventDashboard}/>
              <Route path='/events/:id' component={EventDetailedPage}/>
              <Route path='/people' exact component={PeopleDashboard}/>
              <Route path='/people/:id' component={UserDetailedPage}/>
              <Route path='/settings' component={SettingsDashboard}/>
              <Route path={['/createEvent', '/manage/:id']} component={EventForm}/>
            </Switch>
          </Container>
        </>
      )}/>
    </>
  );
}

export default withRouter(App);
