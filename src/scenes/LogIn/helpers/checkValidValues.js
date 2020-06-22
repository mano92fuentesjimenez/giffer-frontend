import React from 'react';
import { FormattedMessage } from 'react-intl';
import { nameComposition, passwordLength } from 'helpers/validations';

const validations = {
  name: nameComposition,
  password: passwordLength,
}

export default (name, value, values) => {
  const validationTextId = validations[name](value, values);

  if(validationTextId)
    return <FormattedMessage id={validationTextId}/>
  return validationTextId;
}