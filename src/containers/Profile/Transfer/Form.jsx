import React  from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'styledComponents/RaisedButton';
import ErrorText from 'styledComponents/errorText';
import { FieldStyled as Field } from './styled';

import {
  required,
} from 'validation/fields';

const Form = (props) => {
  const { handleSubmit, submitting, onLoadFile, keyFileName, asyncError } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="addressTo"
        validate={[required]}
        component={TextField}
        fullWidth={true}
        floatingLabelText="To Address"
      /><br />
      <Field
        name="amount"
        validate={[required]}
        component={TextField}
        fullWidth={true}
        floatingLabelText="Amount"
        type="number"
      /><br />
      <Field
        name="commission"
        validate={[required]}
        component={TextField}
        fullWidth={true}
        floatingLabelText="Commission"
        type="number"
      /><br />
      {
        (asyncError && asyncError.message)
        &&
        <ErrorText>{asyncError.message}</ErrorText>
      }
      <Button
        label="Send"
        type="submit"
        disabled={submitting}
        primary
      />

    </form>
  )
};

export default  reduxForm({
  form: 'auth' // a unique identifier for this form
})(Form)
