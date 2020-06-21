import giphyProviderSagas from 'services/giphyProvider/sagas';
import notificationSagas from 'services/notifications/sagas';
import modalSagas from 'services/modal-service/sagas';
import userSagas from 'services/user/sagas';
import configurationSagas from 'services/configuration/sagas';
import { sagas as gifSearcherSagas } from 'scenes/GifSearcher';
import { sagas as gifViewerSagas } from 'scenes/GifViewer';

export default [
  giphyProviderSagas,
  gifSearcherSagas,
  gifViewerSagas,
  notificationSagas,
  modalSagas,
  userSagas,
  configurationSagas,
];