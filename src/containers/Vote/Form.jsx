import React  from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { FieldStyled as Field } from './styled';

import {
  required,
  positiveNumber,
} from 'validation/fields';

const Form = () => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="commission"
        validate={[required, positiveNumber]}
        component={TextField}
        fullWidth={true}
        floatingLabelText="Commission"
        type="number"
      /><br />
    </form>
  )
};

export default reduxForm({
  form: 'voteFact' // a unique identifier for this form
})(Form)
