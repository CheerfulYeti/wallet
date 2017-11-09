import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'material-ui/FlatButton';
import { RaisedButtonStyled, FileInputStyled, FileNameStyled } from './styled';
import PropTypes from 'prop-types';

// import { RegForm, FieldStyled } from './styled';
import { Form as RegForm, FieldStyled as Field } from 'styledComponents/form';

import {
  required,
  minLength64,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, pristine, reset, submitting, onLoadFile, keyFileName } = props;
  // console.log('form props: ', props);
  return (
    <RegForm onSubmit={handleSubmit}>
      <RaisedButtonStyled
        label="Choose a key file"
        labelPosition="before"
        containerElement="label"
        onChange={(e) => {
          onLoadFile(e, e.target.value);
        }}
      >
        <FileInputStyled type="file" />
        <FileNameStyled>{keyFileName}</FileNameStyled>
      </RaisedButtonStyled>
      <Field
        name="password"
        type={'password'}
        validate={[required]}
        component={TextField}
        hintText="Enter your password"
      />
      <Button type="submit" disabled={submitting}>Unlock wallet</Button>

    </RegForm>
  )
};

export default reduxForm({
  form: 'auth' // a unique identifier for this form
})(Form)
