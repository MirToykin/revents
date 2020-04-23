import React, {useState} from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import SignedOutMenu from "../menus/SignedOutMenu";
import SignedInMenu from "../menus/SignedInMenus";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {openModal} from "../../modals/modalActions";

const actions = {
  openModal
}

const NavBar = ({history, openModal}) => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogIn = () => {
    openModal('LoginModal')
  }

  const handleRegister = () => {
    openModal('RegisterModal')
  }

  const handleLogOut = () => {
    setAuthenticated(false);
    history.push('/');
  }
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src="/assets/logo.png" alt="logo" />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' exact name="Events" />
        <Menu.Item as={NavLink} to='/people' name="People" />
        <Menu.Item>
          <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
        </Menu.Item>
        {authenticated ?
          <SignedInMenu logOut={handleLogOut}/> :
          <SignedOutMenu logIn={handleLogIn} register={handleRegister}/>}
      </Container>
    </Menu>


  );
};

export default connect(null, actions)(withRouter(NavBar));
