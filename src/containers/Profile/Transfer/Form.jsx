import React  from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Button from 'styledComponents/RaisedButton';
import ErrorText from 'styledComponents/errorText';
import { FieldStyled as Field } from './styled';

import {
  required,
  positiveNumber,
} from 'validation/fields';

const Form = (props) => {
  const {
    handleSubmit,
    submitting,
    valid,
    asyncError,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="addressTo"
        validate={[required]}
        component={TextField}
        fullWidth={true}
        required
        floatingLabelText="To Address"
      /><br />
      <Field
        name="amount"
        validate={[required, positiveNumber]}
        component={TextField}
        fullWidth={true}
        floatingLabelText="Amount"
        type="number"
      /><br />
      <Field
        name="commission"
        validate={[required, positiveNumber]}
        component={TextField}
        fullWidth={true}
        floatingLabelText="Commission"
        type="number"
      /><br />
      <Field
        name="message"
        component={TextField}
        fullWidth={true}
        floatingLabelText="Message"
        type="text"
      /><br />
      {
        (asyncError && asyncError.message)
        &&
        <ErrorText>{asyncError.message}</ErrorText>
      }
      <Button
        label="Send"
        type="submit"
        disabled={submitting || !valid}
        primary
      />

    </form>
  )
};

export default  reduxForm({
  form: 'transfer' // a unique identifier for this form
})(Form)
