import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { CONFIG_LOAD_APP } from 'services/configuration/constants';
import { finishAppLoading, loadPublicKey } from 'services/configuration/actions';
import { logInUSerFromStorage } from 'services/user/actions';
import { UI_ANIMATION_DELAY } from 'constants/constants';

function* loadApp({ getPublicKey }) {
  const key = yield call(getPublicKey);

  yield put(loadPublicKey(key));
  yield put(logInUSerFromStorage());

  yield delay(UI_ANIMATION_DELAY);
  yield put(finishAppLoading());
}

export default function* ({ api }) {
  yield takeEvery(CONFIG_LOAD_APP, loadApp, api, localStorage);
};
