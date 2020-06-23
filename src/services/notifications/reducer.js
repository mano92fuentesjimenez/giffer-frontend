import { CLOSE_NOTIFICATIONS, NOTIFICATIONS_OPENED } from './constants';

const initialState = {
  isOpen: false,
  type: null,
  textId: null,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case NOTIFICATIONS_OPENED:
      return {
        ...state,
        isOpen: true,
        textId: payload.textId,
        type: payload.type,
      };
    case CLOSE_NOTIFICATIONS:
      return  {
        ...state,
        isOpen: false,
        textId: null,
        type: null,
      }
    default:
      return state;
  }
}
