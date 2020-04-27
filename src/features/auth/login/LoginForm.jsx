import React from 'react';
import {Form, Segment, Button, Label} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import TextInput from "../../../app/common/form/TextInput";
import {login} from "../authActions";
import {connect} from "react-redux";

const actions = {
  login
}


const LoginForm = ({login, handleSubmit, error}) => {
  return (
    <Form onSubmit={handleSubmit(login)} size="large">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label basic
                         color='red'
                         style={{
                           width: '100%',
                           marginBottom: '1em',
                           textAlign: 'center'
                         }}
        >{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));