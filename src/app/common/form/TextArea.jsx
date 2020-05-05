import React from 'react';
import {Form, Label} from "semantic-ui-react";

const TextArea = ({input, width, rows, type, placeholder, meta: {touched, error}}) => {
  return (
    <Form.Field error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} type={type} rows={rows}/>
      {touched && error && <Label style={{marginTop: '1em', width: '100%', textAlign: 'center'}} basic color='red'>{error}</Label>}
    </Form.Field>
  );
};

export default TextArea;
