import { CONFIG_APP_LOADED, CONFIG_LOAD_PUBLIC_KEY, CONFIG_SET_LANGUAGUE } from './constants';

const initialState = {
  language: 'en',
  publicKey: null,
  loaded: false,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case CONFIG_SET_LANGUAGUE:
      return {
        ...state,
        language: payload,
      }
    case CONFIG_LOAD_PUBLIC_KEY:
      return {
        ...state,
        publicKey: payload,
      }
    case CONFIG_APP_LOADED:
      return {
        ...state,
        loaded: true,
      }
    default:
      return state;
  }
}
