import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

// import { RegForm } from './styled';
import { Form as AuthForm, FieldStyled as Field } from 'styledComponents/form';

import {
  required,
  minLength2,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  
  console.log('form props: ', props);

  return (
    <AuthForm onSubmit={handleSubmit}>
      <Field
        name="password"
        type={'password'}
        validate={[minLength2, required]}
        component={TextField}
        hintText="password"
      />
      <Button type="submit" disabled={submitting}>Create new wallet</Button>

    </AuthForm>
  )
};

export default reduxForm({
  form: 'registration' // a unique identifier for this form
})(Form)