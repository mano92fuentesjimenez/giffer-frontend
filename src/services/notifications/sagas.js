import { takeEvery, delay, put } from 'redux-saga/effects';
import { NOTIFICATION_TIME, OPEN_NOTIFICATIONS } from 'services/notifications/constants';
import { closeNotifications } from 'services/notifications/actions';

function* openNotifications() {
  yield delay(NOTIFICATION_TIME);
  yield put(closeNotifications());
}

export default function* ({ giphyApi }) {
  yield takeEvery(OPEN_NOTIFICATIONS, openNotifications, giphyApi);
};