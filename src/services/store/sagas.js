import giphyProviderSagas from 'services/giphyProvider/sagas';
import notificationSagas from 'services/notifications/sagas';
import modalSagas from 'services/modal-service/sagas';
import userSagas from 'services/user/sagas';
import configurationSagas from 'services/configuration/sagas';
import { sagas as gifSearcherSagas } from 'scenes/GifSearcher';
import { sagas as logInSagas } from 'scenes/LogIn';
import { sagas as signUpSagas } from 'scenes/SignUp';

export default [
  giphyProviderSagas,
  gifSearcherSagas,
  notificationSagas,
  modalSagas,
  userSagas,
  configurationSagas,
  logInSagas,
  signUpSagas
];