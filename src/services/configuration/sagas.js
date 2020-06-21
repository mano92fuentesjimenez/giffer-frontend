import { takeEvery, call, put } from 'redux-saga/effects';
import { USER_LOGGED_IN } from 'services/user/constants';
import { CONFIG_LOAD_APP, STORED_USER_KEY } from 'services/configuration/constants';
import { finishAppLoading, loadPublicKey } from 'services/configuration/actions';
import { userLoggedIn } from 'services/user/actions';

function* loadApp({ getPublicKey }, localStorage) {
  const key = yield call(getPublicKey);
  const storedUser = yield call(localStorage.getItem, STORED_USER_KEY)

  yield put(loadPublicKey(key));
  yield put(userLoggedIn(storedUser));
  yield put(finishAppLoading());
}

function* storeSignedUser(localStorage, action) {
  yield call(localStorage.setItem, STORED_USER_KEY, action.payload);
}

export default function* ({ api, localStorage }) {
  yield takeEvery(CONFIG_LOAD_APP, loadApp, api, localStorage);
  yield takeEvery(USER_LOGGED_IN, storeSignedUser, localStorage);
};
