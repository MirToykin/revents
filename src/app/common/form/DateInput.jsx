import React from 'react';
import {Form, Label} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const DateInput = ({
  input, width, placeholder,
  meta: {touched, error},
  ...rest
                   }) => {
  return (
    <Form.Field>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={input.value.seconds ? input.value.toDate() : typeof input.value === 'object' ? new Date(input.value) : null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onChangeRaw={(e) => e.preventDefault()}
      />
      {touched && error && <Label style={{marginTop: '1em', width: '100%', textAlign: 'center'}} basic color='red'>{error}</Label>}
    </Form.Field>
  );
};

export default DateInput;
