import React from 'react';
import {Form, Label} from "semantic-ui-react";

const TextInput = ({input, width, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error}>
      <input {...input} placeholder={placeholder} type={type}/>
      {touched && error && <Label style={{marginTop: '1em', width: '100%', textAlign: 'center'}} basic color='red'>{error}</Label>}
    </Form.Field>
  );
};

export default TextInput;
