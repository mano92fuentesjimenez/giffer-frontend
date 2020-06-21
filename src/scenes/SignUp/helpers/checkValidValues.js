import { FormattedMessage } from 'react-intl';
import React from 'react';

const emailRegex = /^\S+@\S+\.\S+$/;

const validations = {
  name: v => v.length !== 0 ? '' : 'sign_up_validation_name',
  email: v => emailRegex.test(v) ? '' : 'sign_up_validation_email',
  password: (v, values) => {
    let message = values.password === values.confirmPassword ? '' : 'sign_up_validation_password'
    message = values.password.length > 6 ? message: 'sign_up_password_length_validation';
    return message
  },
  confirmPassword: (v, values) => values.password === values.confirmPassword ? '' : 'sign_up_validation_password',
}

export default (name, value, values) => {
  const validationTextId = validations[name](value, values);

  if(validationTextId)
    return <FormattedMessage id={validationTextId}/>
  return validationTextId;
}