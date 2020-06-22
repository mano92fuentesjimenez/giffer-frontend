import { takeEvery, delay, put, select } from 'redux-saga/effects';
import { NOTIFICATION_TIME, OPEN_NOTIFICATIONS } from 'services/notifications/constants';
import { closeNotifications } from 'services/notifications/actions';
import { selectAppLoaded } from 'services/configuration/selectors';

function* openNotifications() {
  const appLoaded = yield select(selectAppLoaded);
  if(appLoaded) {
    yield delay(NOTIFICATION_TIME);
    yield put(closeNotifications());
  }
}

export default function* ({ giphyApi }) {
  yield takeEvery(OPEN_NOTIFICATIONS, openNotifications, giphyApi);
};