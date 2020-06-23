import { FormattedMessage } from 'react-intl';
import React from 'react';

export const passwordLength = password => password.length > 6 ? '' : 'sign_up_password_length_validation';

const emailRegex = /^\S+@\S+\.\S+$/;
export const emailComposition =  email => emailRegex.test(email) ? '' : 'user_data_validation_email';

export const nameComposition = name => name.length !== 0 ? '' : 'sign_up_validation_name';

const validations = {
  name: nameComposition,
  email: emailComposition,
  password: (v, values, checkConfirmPassword) => {
    let message = '';
    if(checkConfirmPassword)
      message = values.password === values.confirmPassword ? message : 'sign_up_validation_password';

    const passwordLengthMessage = passwordLength(values.password);

    message = passwordLengthMessage === '' ? message : passwordLengthMessage;
    return message
  },
  confirmPassword: (v, values) => values.password === values.confirmPassword ? '' : 'sign_up_validation_password',
}

export const checkValidValues = (name, value, values, checkConfirmPassword = false) => {
  const validationTextId = validations[name](value, values, checkConfirmPassword);

  if(validationTextId)
    return <FormattedMessage id={validationTextId}/>
  return validationTextId;
}