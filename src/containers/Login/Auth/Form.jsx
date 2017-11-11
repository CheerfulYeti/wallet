import React  from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'styledComponents/RaisedButton';
import { RaisedButtonStyled, FileInputStyled, FileNameStyled } from './styled';
import ErrorText from 'styledComponents/errorText';
import { Form as RegForm, FieldStyled as Field } from 'styledComponents/form';

import {
  required,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, submitting, onLoadFile, keyFileName, asyncError } = props;
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
      {
        (asyncError && asyncError.message)
        &&
        <ErrorText>{asyncError.message}</ErrorText>
      }
      <Button
        label="Unlock wallet"
        type="submit"
        disabled={submitting}
        primary
      />

    </RegForm>
  )
};

export default reduxForm({
  form: 'auth' // a unique identifier for this form
})(Form)
