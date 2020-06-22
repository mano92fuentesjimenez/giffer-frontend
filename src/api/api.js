import axios from 'axios';
import { PAGINATION_LIMIT } from "constants/constants";
import { giffsTransmuter, keyTransmuter, userTransmuter } from 'api/transmuters';

export default function () {
  const client = axios.create({
    baseURL: `http://localhost:8000`,
    headers: { 'Content-Type': 'application/json' },
  });

  const getParams = (params = {}) =>{
    return {
        params: {
          ...params,
      }
    }
  };

  const searchGifs = (text, offset = 0, limit = PAGINATION_LIMIT) => {
    return giffsTransmuter(
      client.get('gifs/search', getParams({ q: text, offset, limit })),
      text,
    );
  };

  const searchTrendingGifs = (offset = 0, limit = PAGINATION_LIMIT) => {
    return giffsTransmuter(client.get('gifs/trending', getParams({ offset, limit })));
  };

  const signUpUser = (user) => {
    const { password, name, email } = user
    return userTransmuter(client.post('/sign-up', { password, name, email }));
  }

  const logInUser = userCredentials => {
    const { password, name } = userCredentials;
    return userTransmuter(client.post('/log-in', { password, name }));
  }

  const getPublicKey = () => {
    return keyTransmuter(client.get('getPublicKey'));
  }

  return {
    searchGifs,
    searchTrendingGifs,
    signUpUser,
    getPublicKey,
    logInUser,
  }
}
