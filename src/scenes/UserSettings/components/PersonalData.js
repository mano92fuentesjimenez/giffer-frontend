import React from 'react';
import bem from 'bem-cn'
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';
import PasswordInput from 'components/PasswordInput/PasswordInput';
import usePersonalData from 'hooks/usePersonalData';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPersonalData } from 'services/user/actions';
import { selectUser } from 'services/user/selectors';
import './PersonalData.scss'

const b = bem('scenes-user-settings-personal-data');

const PersonalData = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { values, validationValues, onChange } = usePersonalData(true, user);

  const onSubmit = (fieldName) => () =>
    dispatch(changeUserPersonalData({
      [fieldName]: values[fieldName],
    }));

  return <div className={b()}>
    <div className={b('title')()}><FormattedMessage id={'settings_personal_title'}/> </div>
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
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={onSubmit('name')}
          disabled={validationValues.name !== ''}
          className={b('submit_button')()}
        >
          <FormattedMessage id="submit"/>
        </Button>
      </div>
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
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={onSubmit('email')}
          disabled={validationValues.email !== ''}
          className={b('submit_button')()}
        >
          <FormattedMessage id="submit"/>
        </Button>
      </div>
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
      />
    </div>
    <Button
      variant="outlined"
      color="primary"
      onClick={onSubmit('password')}
      disabled={validationValues.password !== '' && validationValues.confirmPassword !== ''}
    >
      <FormattedMessage id="signup"/>
    </Button>
  </div>
}

export default PersonalData;