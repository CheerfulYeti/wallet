import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

// import { RegForm, FieldStyled } from './styled';
import { Form as RegForm, FieldStyled as Field } from 'styledComponents/form';

import {
  required,
  minLength64,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  
  console.log('form props: ', props);

  return (
    <RegForm onSubmit={handleSubmit}>
      <Field
        name="Private key"
        type={'password'}
        validate={[required, minLength64]}
        component={TextField}
        hintText="Enter your private key"
      />
      <Button type="submit" disabled={submitting}>Unlock wallet</Button>

    </RegForm>
  )
};

export default reduxForm({
  form: 'auth' // a unique identifier for this form
})(Form)
