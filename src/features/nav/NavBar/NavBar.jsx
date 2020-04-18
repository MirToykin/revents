import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src="assets/logo.png" alt="logo" />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name="Events" />
        <Menu.Item as={NavLink} to='/people' name="People" />
        <Menu.Item>
          <Button as={Link} to='createEvent' floated="right" positive inverted content="Create Event" />
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button basic inverted content="Sign Out" style={{marginLeft: '0.5em'}} />
        </Menu.Item>
      </Container>
    </Menu>


  );
};

export default NavBar;
