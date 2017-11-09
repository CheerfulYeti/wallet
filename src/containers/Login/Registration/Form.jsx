import React from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'styledComponents/RaisedButton';

import { Form as AuthForm, FieldStyled as Field } from 'styledComponents/form';

import {
  required,
  minLength2,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, submitting } = props;
  
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
      <Button
        label="Create new wallet"
        type="submit"
        disabled={submitting}
        primary
      />

    </AuthForm>
  )
};

export default reduxForm({
  form: 'registration' // a unique identifier for this form
})(Form)