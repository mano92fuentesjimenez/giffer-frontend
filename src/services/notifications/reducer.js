import { CLOSE_NOTIFICATIONS, OPEN_NOTIFICATIONS } from './constants';

const initialState = {
  isOpen: false,
  type: null,
  text: null,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_NOTIFICATIONS:
      return {
        ...state,
        isOpen: true,
        text: payload.text,
        type: payload.type,
      };
    case CLOSE_NOTIFICATIONS:
      return  {
        ...state,
        isOpen: false,
        text: null,
        type: null,
      }
    default:
      return state;
  }
}
