import React from 'react';
import { FormattedMessage } from 'react-intl';
import { emailComposition, nameComposition, passwordLength } from 'helpers/validations';

const validations = {
  name: nameComposition,
  email: emailComposition,
  password: (v, values) => {
    let message = values.password === values.confirmPassword ? '' : 'sign_up_validation_password'
    const passwordLengthMessage = passwordLength(values.password);

    message = passwordLengthMessage === '' ? message : passwordLengthMessage;
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