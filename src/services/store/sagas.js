import giphyProviderSagas from 'services/giphyProvider/sagas';
import { sagas as gifSearcherSagas } from 'scenes/GifSearcher';

export default [
  giphyProviderSagas,
  gifSearcherSagas
];