import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import bem from 'bem-cn'
import './PasswordInput.scss'

const b = bem('components-password-input');
const PasswordInput = ({ value, onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return <div className={b()}>
    <TextField
      value={value}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
      className={b('input')()}
      variant="filled"
      {...props}
    />
    <IconButton
      className={b('show-icon')()}
      onClick={handleTogglePasswordVisibility}
      edge="end"
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </div>;
}

export default PasswordInput