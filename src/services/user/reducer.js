import { AUTHORIZATION_ERROR, LOG_IN_USER, SIGN_UP_USER, USER_LOGGED_IN } from './constants';

const initialState = {
  user: null,
  authorizationError: null,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: payload,
        authorizationError: null,
      }
    case SIGN_UP_USER:
    case LOG_IN_USER:
      return {
        ...state,
        authorizationError: null,
      }
    case AUTHORIZATION_ERROR:
      return {
        ...state,
        authorizationError: payload,
      }
    default:
      return state;
  }
}
