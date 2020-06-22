import React, { useState } from 'react';
import bem from 'bem-cn';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import { logInUser } from 'services/user/actions';
import Button from '@material-ui/core/Button';
import checkValidValues from '../helpers/checkValidValues';
import isValid from '../helpers/isValid';
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import { selectAuthorizationError } from 'services/user/selectors';

const b = bem('scenes-login');
const LogIn = () => {
  const dispatch = useDispatch();
  const authorizationError = useSelector(selectAuthorizationError);

  const [values, setValues] = useState({
    name: '',
    password: '',
  })
  const [validationValues, setValidationValues] = useState({
    name: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false);
  const onChange = (e) => {
    const { name, value } = e.target;
    const changedValues = {
      ...values,
      [name]: value,
    };
    setValues(changedValues);

    const validationValue = checkValidValues(name, value, changedValues)

    setValidationValues({
      ...validationValues,
      [name]: validationValue,
    })
  }
  const onSubmit = () => {
    dispatch(logInUser(values));
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={b()}>
      <div className={b('welcome')()}>
        <FormattedMessage id="log_in_welcome"/>
      </div>
      <div className={b('welcome-description')()}>
        <FormattedMessage id="log_in_welcome_description"/>
      </div>
      {
        authorizationError &&
        <div className={b('authorization-error')()}>
          <FormattedMessage id={authorizationError} />
        </div>
      }
      <div className={b('form-block')()}>
        <TextField
          value={values.name}
          label={<FormattedMessage id="log_in_name"/>}
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
        <PasswordInput
          value={values.password}
          label={<FormattedMessage id="log_in_password"/>}
          onChange={onChange}
          name="password"
          required
          error={!!validationValues.password}
          helperText={validationValues.password}
          showPassword={showPassword}
          handleToggleShowPassword={handleTogglePasswordVisibility}
        />
      </div>

      <div className={b('log-in-container')()}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onSubmit}
          disabled={!isValid(validationValues)}
        >
          <FormattedMessage id="login"/>
        </Button>
      </div>
    </div>
  );
}

export default LogIn;