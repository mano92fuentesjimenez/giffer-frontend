import {
  CONFIG_APP_LOADED,
  CONFIG_LOAD_APP,
  CONFIG_LOAD_PUBLIC_KEY,
  CONFIG_SET_LANGUAGUE
} from 'services/configuration/constants';

export const setLanguage = (language) => ({ type: CONFIG_SET_LANGUAGUE, payload: language });
export const loadApp = () => ({ type: CONFIG_LOAD_APP });
export const loadPublicKey = (key) => ({ type: CONFIG_LOAD_PUBLIC_KEY, payload: key });
export const finishAppLoading = () => ({ type: CONFIG_APP_LOADED });
