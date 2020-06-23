export const getUserDataError = (e) => {
  let errorMsg = 'undefined_error';
  if(e.response.status === 409){
    // eslint-disable-next-line
    switch (e.response.data) {
      case 'User already exists':
        errorMsg = 'user_data_validation_name_exist';
        break
      case 'Email already taken':
        errorMsg = 'user_data_validation_email_exists';
        break
    }
  }
  if(e.response.status === 400 && e.response.data === 'child "email" fails because ["email" must be a valid email]') {
    errorMsg = 'user_data_validation_email';
  }

  return errorMsg;
}