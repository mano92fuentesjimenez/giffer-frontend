import { takeEvery, call, put } from 'redux-saga/effects';
import { CONFIG_LOAD_APP } from 'services/configuration/constants';
import { finishAppLoading, loadPublicKey } from 'services/configuration/actions';
import { logInUSerFromStorage } from 'services/user/actions';

function* loadApp({ getPublicKey }) {
  const key = yield call(getPublicKey);

  yield put(loadPublicKey(key));
  yield put(logInUSerFromStorage());
  yield put(finishAppLoading());
}

export default function* ({ api }) {
  yield takeEvery(CONFIG_LOAD_APP, loadApp, api, localStorage);
};
