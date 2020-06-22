import { useState } from 'react';
import { checkValidValues } from 'helpers/validations';

const usePersonalData = (checkConfirmPassword) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [validationValues, setValidationValues] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const onChange = (e) => {
    const { name, value } = e.target;
    const changedValues = {
      ...values,
      [name]: value,
    };
    setValues(changedValues);

    if(name === 'password' || name === 'confirmPassword'){
      const password = checkValidValues('password', changedValues.password, changedValues, checkConfirmPassword)
      const confirmPassword = checkValidValues(
        'confirmPassword',
        changedValues.confirmPassword,
        changedValues,
        checkConfirmPassword
      )
      return setValidationValues({
        ...validationValues,
        password,
        confirmPassword,
      })
    }
    const validationValue = checkValidValues(name, value, changedValues)

    setValidationValues({
      ...validationValues,
      [name]: validationValue,
    })
  }

  return { values, validationValues, onChange };
}

export default usePersonalData;