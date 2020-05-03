import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../app/common/form/DateInput";
import TextInput from "../../../app/common/form/TextInput";

class BasicPage extends Component {

  render() {
    const {pristine, submitting} = this.props;
    return (
      <Segment>
        <Header dividing size='large' content='Basics' />
        <Form>
          <Field
            width={8}
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Form.Group inline>
            {/* todo: Gender Radio button */}
          </Form.Group>
          <Field
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of Birth'
          />
          <Divider/>
          <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({form: 'userProfile', enableReinitialize: true})(BasicPage);