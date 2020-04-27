import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import SignedOutMenu from "../menus/SignedOutMenu";
import SignedInMenu from "../menus/SignedInMenus";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {openModal} from "../../modals/modalActions";
import {withFirebase} from "react-redux-firebase";

const actions = {
  openModal
}

const mapState = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const NavBar = ({history, openModal, auth, firebase}) => {

  const authenticated = auth.isLoaded && !auth.isEmpty;

  const handleLogIn = () => {
    openModal('LoginModal')
  }

  const handleRegister = () => {
    openModal('RegisterModal')
  }

  const handleLogOut = () => {
    firebase.logout();
    history.push('/');
  }
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src="/assets/logo.png" alt="logo"/>
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' exact name="Events"/>
        {authenticated && <>
          <Menu.Item as={NavLink} to='/people' name="People"/>
          <Menu.Item>
            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event"/>
          </Menu.Item>
        </>}
        {authenticated ?
          <SignedInMenu logOut={handleLogOut} auth={auth}/> :
          <SignedOutMenu logIn={handleLogIn} register={handleRegister}/>}
      </Container>
    </Menu>


  );
};

export default connect(mapState, actions)(withFirebase(withRouter(NavBar)));
