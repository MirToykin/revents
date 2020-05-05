import React from 'react';
import {Form, Label} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const DateInput = ({
  input: {value, onChange, onBlur}, width, placeholder,
  meta: {touched, error},
  ...rest
}) => {
  return (
    <Form.Field>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={value.seconds ? value.toDate() : typeof value === 'object' ? value : null}
        onChange={onChange}
        onBlur={onBlur}
        onChangeRaw={(e) => e.preventDefault()}
      />
      {touched && error && <Label style={{marginTop: '1em', width: '100%', textAlign: 'center'}} basic color='red'>{error}</Label>}
    </Form.Field>
  );
};

export default DateInput;
