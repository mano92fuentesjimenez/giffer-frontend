import axios from 'axios';
import { PAGINATION_LIMIT } from "constants/constants";
import { giffsTransmuter, keyTransmuter, userTransmuter } from 'api/transmuters';
import getStore from 'services/store';
import { selectToken } from 'services/user/selectors';

export default function () {
  const client = axios.create({
    baseURL: `http://971c07cf-4c37-46b9-a6ef-ae88f0531a7a.clouding.host:8000`,
    headers: { 'Content-Type': 'application/json' },
  });

  const getParams = (params = {}, auth) => {
    const token = selectToken(getStore().getState());
    return {
        params: {
          ...params,
          ...(auth ? { token } : {}),
      }
    }
  };

  const getBody = (params, auth) => {
    const token = selectToken(getStore().getState());
    return {
      ...params,
      ...(auth ? { token } : {}),
    }
  }

  const searchGifs = (text, offset = 0, limit = PAGINATION_LIMIT) => {
    return giffsTransmuter(
      client.get('gifs/search', getParams({ q: text, offset, limit }, true)),
      text,
    );
  };

  const searchTrendingGifs = (offset = 0, limit = PAGINATION_LIMIT) => {
    return giffsTransmuter(client.get('gifs/trending', getParams({ offset, limit }, true)));
  };

  const signUpUser = (user) => {
    return userTransmuter(client.post('/sign-up', { ...user }));
  }

  const logInUser = userCredentials => {
    const { password, name } = userCredentials;
    return userTransmuter(client.post('/log-in', { password, name }));
  }

  const getPublicKey = () => {
    return keyTransmuter(client.get('getPublicKey'));
  }

  const changeUserPersonalData = personalData => {
    return userTransmuter(client.put(`/user`, getBody(personalData, true)));
  }

  const removeUserAccount = () => {
    return client.post(`/user/remove`, getBody({}, true));
  }

  const toggleFavoriteGif = (gifId) => {
    return client.post(`/user/toggleFavoriteGif`, getBody({ gifId }, true));
  }

  return {
    searchGifs,
    searchTrendingGifs,
    signUpUser,
    getPublicKey,
    logInUser,
    changeUserPersonalData,
    removeUserAccount,
    toggleFavoriteGif
  }
}
