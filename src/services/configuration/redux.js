import { CONFIG_SET_LANGUAGUE } from './constants';

const initialState = {
  language: 'en'
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case CONFIG_SET_LANGUAGUE:
      return {
        ...state,
        language: payload,
      }
    default:
      return state;
  }
}
