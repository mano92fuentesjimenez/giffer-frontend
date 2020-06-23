import {
  ACCOUNT_REMOVED,
  AUTHORIZATION_ERROR, CHANGE_USER_PERSONAL_DATA,
  LOG_IN_USER,
  LOG_OUT,
  LOGIN_USER_FROM_STORAGE, REFRESH_TOKEN, REMOVE_ACCOUNT,
  SIGN_UP_USER,
  USER_LOGGED_IN
} from 'services/user/constants';

export const signUpUser = (user) => ({ type: SIGN_UP_USER, payload: user });
export const logInUser = (userCredentials) => ({ type: LOG_IN_USER, payload: userCredentials });
export const logOut = () => ({ type: LOG_OUT });
export const userLoggedIn = (user) => ({ type: USER_LOGGED_IN, payload: user });
export const logInUSerFromStorage = () => ({ type: LOGIN_USER_FROM_STORAGE })
export const authorizationError = (message) => ({ type: AUTHORIZATION_ERROR, payload: message });
export const changeUserPersonalData = (personalData) => ({ type: CHANGE_USER_PERSONAL_DATA, payload: personalData });
export const refreshToken = (userToken) => ({ type: REFRESH_TOKEN, payload: userToken });
export const removeAccount = () => ({ type: REMOVE_ACCOUNT });
export const accountRemoved = () => ({ type: ACCOUNT_REMOVED });