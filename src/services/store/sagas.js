import giphyProviderSagas from 'services/giphyProvider/sagas';
import notificationSagas from 'services/notifications/sagas';
import { sagas as gifSearcherSagas } from 'scenes/GifSearcher';
import { sagas as gifViewerSagas } from 'scenes/GifViewer';

export default [
  giphyProviderSagas,
  gifSearcherSagas,
  gifViewerSagas,
  notificationSagas,
];