import { USER_LOGGED_IN } from './constants';

const initialState = {
  user: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        user: payload,
      }
    default:
      return state;
  }
}
