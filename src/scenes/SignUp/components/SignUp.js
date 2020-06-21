import React, { useState } from 'react';
import bem from 'bem-cn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import './SignUp.scss'
import checkValidValues from 'scenes/SignUp/helpers/checkValidValues';
import { useDispatch } from 'react-redux';
import { signUpUser } from 'services/user/actions';
import isValid from 'scenes/SignUp/helpers/isValid';

const b = bem('scenes-signup');
const SignUp = () => {
  const dispatch = useDispatch();
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
  const [viewPassword, setViewPassword] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const changedValues = {
      ...values,
      [name]: value,
    };
    setValues(changedValues);

    if(name === 'password' || name === 'confirmPassword'){
      const password = checkValidValues('password', changedValues.password, changedValues)
      const confirmPassword = checkValidValues('confirmPassword', changedValues.confirmPassword, changedValues)
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
  const onSubmit = () => {
    dispatch(signUpUser(values));
  }
  return (
    <div className={b()}>
      <div className={b('welcome')()}>
        <FormattedMessage id="signup_welcome"/>
      </div>
      <div className={b('welcome-description')()}>
        <FormattedMessage id="signup_welcome_description"/>
      </div>
      <div className={b('form-block')()}>
        <TextField
          value={values.name}
          label={<FormattedMessage id="signup_name"/>}
          placeholder="miggy92"
          onChange={onChange}
          name="name"
          className={b('input')()}
          variant="filled"
          required
          error={!!validationValues.name}
          helperText={validationValues.name}
        />
      </div>
      <div className={b('form-block')()}>
        <TextField
          value={values.email}
          label={<FormattedMessage id="signup_email"/>}
          placeholder="miggy92@gmail.com"
          onChange={onChange}
          name="email"
          className={b('input')()}
          variant="filled"
          required
          error={!!validationValues.email}
          helperText={validationValues.email}
        />
      </div>
      <div className={b('form-block')()}>
        <TextField
          value={values.password}
          label={<FormattedMessage id="signup_password"/>}
          onChange={onChange}
          name="password"
          type={viewPassword ? 'text' : 'password'}
          className={b('input')()}
          variant="filled"
          required
          error={!!validationValues.password}
          helperText={validationValues.password}
        />
      </div>
      <div className={b('form-block')()}>
        <TextField
          value={values.confirmPassword}
          label={<FormattedMessage id="signup_password_confirmation"/>}
          onChange={onChange}
          name="confirmPassword"
          type={viewPassword ? 'text' : 'password'}
          className={b('input')()}
          variant="filled"
          required
          error={!!validationValues.confirmPassword}
          helperText={validationValues.confirmPassword}
        />
      </div>

      <div className={b('sign-up-container')()}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onSubmit}
          disabled={!isValid(validationValues)}
        >
          <FormattedMessage id="signup"/>
        </Button>
      </div>

    </div>
  );

}

export default SignUp;