import React from 'react';
import {Button, Menu} from "semantic-ui-react";

const SignedOutMenu = ({logIn}) => {
  return (
    <Menu.Item position="right">
      <Button onClick={logIn} basic inverted content="Login" />
      <Button basic inverted content="Sign Out" style={{marginLeft: '0.5em'}} />
    </Menu.Item>
  );
};

export default SignedOutMenu;
