import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'styledComponents/RaisedButton';

import { Form as RegForm, FieldStyled as Field } from 'styledComponents/form';

import {
  required,
  minLength64,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <RegForm onSubmit={handleSubmit}>
      <Field
        name="Private key"
        type={'password'}
        validate={[required, minLength64]}
        component={TextField}
        hintText="Enter your private key"
      />
      <Button
        disabled={submitting}
        primary
        label="Unlock wallet"/>

    </RegForm>
  )
};

export default reduxForm({
  form: 'auth' // a unique identifier for this form
})(Form)
