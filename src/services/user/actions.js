import { AUTHORIZATION_ERROR, LOGIN_USER_FROM_STORAGE, SIGN_UP_USER, USER_LOGGED_IN } from 'services/user/constants';

export const signUpUser = (user) => ({ type: SIGN_UP_USER, payload: user });
export const userLoggedIn = (user) => ({ type: USER_LOGGED_IN, payload: user });
export const logInUSerFromStorage = () => ({ type: LOGIN_USER_FROM_STORAGE })
export const authorizationError = (message) => ({ type: AUTHORIZATION_ERROR, payload: message });