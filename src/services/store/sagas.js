import giphyProviderSagas from 'services/giphyProvider/sagas';
import notificationSagas from 'services/notifications/sagas';
import modalSagas from 'services/modal-service/sagas';
import userSagas from 'services/user/sagas';
import configurationSagas from 'services/configuration/sagas';
import { sagas as gifSearcherSagas } from 'scenes/GifSearcher';

export default [
  giphyProviderSagas,
  gifSearcherSagas,
  notificationSagas,
  modalSagas,
  userSagas,
  configurationSagas,
];