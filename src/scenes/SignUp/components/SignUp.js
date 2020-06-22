import React, { useState } from 'react';
import bem from 'bem-cn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from 'services/user/actions';
import isValid from 'scenes/SignUp/helpers/isValid';
import { selectAuthorizationError } from 'services/user/selectors';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import usePersonalData from 'hooks/usePersonalData';
import './SignUp.scss'

const b = bem('scenes-signup');
const SignUp = () => {
  const dispatch = useDispatch();
  const authorizationError = useSelector(selectAuthorizationError);
  const { values, validationValues, onChange } = usePersonalData(true);

  const onSubmit = () => {
    dispatch(signUpUser(values));
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className={b()}>
      <div className={b('welcome')()}>
        <FormattedMessage id="signup_welcome"/>
      </div>
      <div className={b('welcome-description')()}>
        <FormattedMessage id="signup_welcome_description"/>
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
        <PasswordInput
          value={values.password}
          label={<FormattedMessage id="signup_password"/>}
          onChange={onChange}
          name="password"
          required
          error={!!validationValues.password}
          helperText={validationValues.password}
          showPassword={showPassword}
          handleToggleShowPassword={handleTogglePasswordVisibility}
        />
      </div>
      <div className={b('form-block')()}>
        <PasswordInput
          value={values.confirmPassword}
          label={<FormattedMessage id="signup_password_confirmation"/>}
          onChange={onChange}
          name="confirmPassword"
          required
          error={!!validationValues.confirmPassword}
          helperText={validationValues.confirmPassword}
          showPassword={showPassword}
          handleToggleShowPassword={handleTogglePasswordVisibility}
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