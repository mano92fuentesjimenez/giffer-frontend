import { takeEvery, call, select, put } from 'redux-saga/effects';
import { PATH as GIFS_PATH } from 'scenes/GifSearcher';
import { push } from 'connected-react-router';
import {
  CHANGE_USER_PERSONAL_DATA,
  LOG_IN_USER,
  LOG_OUT,
  LOGIN_USER_FROM_STORAGE, REFRESH_TOKEN, REMOVE_ACCOUNT,
  SIGN_UP_USER,
  USER_LOGGED_IN
} from 'services/user/constants';
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken';
import { selectPublicKey } from 'services/configuration/selectors';
import {
  authorizationError,
  userLoggedIn as userLoggedInAction,
  logOut as logOutAction,
  refreshToken as refreshTokenAction, accountRemoved,
} from './actions';
import { showNotifications } from 'services/notifications/actions';
import { NOTIFICATION_TYPES } from 'services/notifications/constants';
import { STORED_USER_KEY } from 'services/localStorage/constants';
import { getUserDataError } from 'services/user/helpers';

function* signUpUser({ signUpUser }, { payload: user }) {
  try {
    const signedUser = yield call(signUpUser, user);
    if(yield call(doLogIn, signedUser)) {
      yield put(push(GIFS_PATH))
      yield put(showNotifications({type: NOTIFICATION_TYPES.INFO, textId: 'notification_user_logged_in'}))
    }
  }
  catch (e) {
    const errorMsg = getUserDataError(e);
    yield put(authorizationError(errorMsg));
  }
}

function* logInUser( { logInUser }, { payload: userCredentials }) {
  try {
    const user = yield call(logInUser, userCredentials)
    if(yield call(doLogIn, user)) {
      yield put(push(GIFS_PATH))
      yield put(showNotifications({type: NOTIFICATION_TYPES.INFO, textId: 'notification_user_logged_in'}))
    }
  }
  catch (e) {
    let errorMsg = 'undefined_error';
    if(e.response.status === 404 && e.response.data === 'User not found' )
      errorMsg = 'log_in_user_not_found';
    if(e.response.status === 403 && e.response.data === 'Incorrect password supplied') {
      errorMsg = 'log_in_invalid_password';
    }
    yield put(authorizationError(errorMsg));
  }
}

function* logOut(localStorage) {
  yield call(localStorage.removeItem, STORED_USER_KEY);
  yield put(showNotifications({
    type: NOTIFICATION_TYPES.INFO,
    textId: 'logged_out',
  }))
}

function* getUserFromToken(token) {
  const publicKey = yield select(selectPublicKey);
  try {
    return yield call(jsonwebtoken.verify, token, publicKey, {algorithms: ['RS512']})
  } catch (e) {
    if (e instanceof JsonWebTokenError)
      yield put(logOutAction());
  }
}

function* doLogIn(userToken) {
  const userFromToken = yield call(getUserFromToken, userToken);

  if (userFromToken) {
    yield put(userLoggedInAction({
      userObj: userFromToken,
      token: userToken,
    }));
    return true;
  }
}

function* logInUserFromStorage(localStorage) {
  const storedUser = yield call(localStorage.getItem, STORED_USER_KEY)

  if(storedUser)
    yield call(doLogIn, storedUser)
}

function* storeSignedUser(localStorage, action) {
  yield call(localStorage.setItem, STORED_USER_KEY, action.payload.token);
}

function* changeUserPersonalData({ changeUserPersonalData }, { payload: personalData}) {

  try {
    const user = yield call(changeUserPersonalData, personalData);
    yield put(refreshTokenAction(user));
    yield put(showNotifications({
      type: NOTIFICATION_TYPES.INFO,
      textId: 'changed_notification',
    }))
  } catch (e) {
    const errorMsg = getUserDataError(e);
    yield put(authorizationError(errorMsg));
  }
}

function* refreshToken({ payload: userToken }) {
  yield call(doLogIn, userToken)
}

function* removeAccount({ removeUserAccount }, localStorage) {
  yield call(removeUserAccount);
  yield call(localStorage.removeItem, STORED_USER_KEY);
  yield put(accountRemoved());
  yield put(push(GIFS_PATH))
  yield put(showNotifications({
    type: NOTIFICATION_TYPES.INFO,
    textId: 'account_removed',
  }))
}

export default function* ({ api, localStorage }) {
  yield takeEvery(SIGN_UP_USER, signUpUser, api);
  yield takeEvery(LOG_IN_USER, logInUser, api);
  yield takeEvery(LOG_OUT, logOut, localStorage);
  yield takeEvery(USER_LOGGED_IN, storeSignedUser, localStorage);
  yield takeEvery(REFRESH_TOKEN, refreshToken);
  yield takeEvery(LOGIN_USER_FROM_STORAGE, logInUserFromStorage, localStorage);
  yield takeEvery(CHANGE_USER_PERSONAL_DATA, changeUserPersonalData, api);
  yield takeEvery(REMOVE_ACCOUNT, removeAccount, api, localStorage);
};
