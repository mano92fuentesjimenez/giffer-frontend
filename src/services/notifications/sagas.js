import { takeEvery, delay, put, select } from 'redux-saga/effects';
import { NOTIFICATION_TIME, OPEN_NOTIFICATIONS } from 'services/notifications/constants';
import { closeNotifications, notificationsOpened } from 'services/notifications/actions';
import { selectAppLoaded } from 'services/configuration/selectors';

function* openNotifications(action) {
  const appLoaded = yield select(selectAppLoaded);
  if(appLoaded) {
    yield put(notificationsOpened(action.payload))
    yield delay(NOTIFICATION_TIME);
    yield put(closeNotifications());
  }
}

export default function* () {
  yield takeEvery(OPEN_NOTIFICATIONS, openNotifications);
};