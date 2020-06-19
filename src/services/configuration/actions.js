import { CONFIG_SET_LANGUAGUE } from 'services/configuration/constants';

export const setLanguage = (language) => ({ type: CONFIG_SET_LANGUAGUE, payload: language });
