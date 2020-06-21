import { SIGN_UP_USER, USER_LOGGED_IN } from 'services/user/constants';

export const signUpUser = (user) => ({ type: SIGN_UP_USER, payload: user });
export const userLoggedIn = (user) => ({ type: USER_LOGGED_IN, payload: user });