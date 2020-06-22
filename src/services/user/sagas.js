import { takeEvery, call, select, put } from 'redux-saga/effects';
import { PATH as GIFS_PATH } from 'scenes/GifSearcher';
import { push } from 'connected-react-router';
import { LOGIN_USER_FROM_STORAGE, SIGN_UP_USER, USER_LOGGED_IN } from 'services/user/constants';
import jsonwebtoken from 'jsonwebtoken';
import { selectAppLoaded, selectPublicKey } from 'services/configuration/selectors';
import { authorizationError, userLoggedIn as userLoggedInAction } from './actions';
import { showNotifications } from 'services/notifications/actions';
import { NOTIFICATION_TYPES } from 'services/notifications/constants';
import { STORED_USER_KEY } from 'services/localStorage/constants';

function* signUpUser({ signUpUser }, { payload: user }) {
  try {
    const signedUser = yield call(signUpUser, user);
    yield call(logInUser, signedUser);
  }
  catch (e) {
    let errorMsg = 'undefined_error';
    if(e.response.status === 409){
      // eslint-disable-next-line
      switch (e.response.data) {
        case 'User already exists':
          errorMsg = 'sign_up_validation_name_exists';
          break
        case 'Email already taken':
          errorMsg = 'sign_up_validation_email_exists';
          break
      }
    }
    if(e.response.status === 400 && e.response.data === 'child "email" fails because ["email" must be a valid email]') {
      errorMsg = 'sign_up_validation_email';
    }
    yield put(authorizationError(errorMsg));
  }
}

function* logInUser(user) {
  const publicKey = yield select(selectPublicKey);

  const userObj = yield call(jsonwebtoken.verify, user, publicKey, { algorithms: ['RS512'] });
  yield put(userLoggedInAction({
    userObj,
    token: user,
  }));
}

function* userLoggedIn() {
  const appLoaded = yield select(selectAppLoaded);

  yield put(push(GIFS_PATH))
  if(appLoaded)
    yield put(showNotifications({ type: NOTIFICATION_TYPES.INFO, textId: 'notification_user_logged_in' }))
}

function* logInUserFromStorage(localStorage) {
  const storedUser = yield call(localStorage.getItem, STORED_USER_KEY)

  if(storedUser)
    yield call(logInUser, storedUser)
}

function* storeSignedUser(localStorage, action) {
  yield call(localStorage.setItem, STORED_USER_KEY, action.payload.token);
}

export default function* ({ api, localStorage }) {
  yield takeEvery(LOGIN_USER_FROM_STORAGE, logInUserFromStorage, localStorage);
  yield takeEvery(SIGN_UP_USER, signUpUser, api);
  yield takeEvery(USER_LOGGED_IN, userLoggedIn, api);
  yield takeEvery(USER_LOGGED_IN, storeSignedUser, localStorage);
};
