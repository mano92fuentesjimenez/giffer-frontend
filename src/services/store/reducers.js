import giphyProviderReducer from 'services/giphyProvider/reducer'
import configReducer from 'services/configuration/reducer';
import notificationsReducer from 'services/notifications/reducer';
import userReducer from 'services/user/reducer';

const reducers = {
  giphyProviderReducer,
  configReducer,
  notificationsReducer,
  userReducer,
};
export default reducers;