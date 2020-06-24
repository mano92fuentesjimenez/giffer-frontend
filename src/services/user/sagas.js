import { takeEvery, call, select, put } from 'redux-saga/effects';
import { omit } from 'lodash';
import {
  CHANGE_USER_PERSONAL_DATA,
  LOG_IN_USER,
  LOG_OUT,
  LOGIN_USER_FROM_STORAGE, REFRESH_TOKEN, REMOVE_ACCOUNT,
  SIGN_UP_USER,
  USER_LOGGED_IN
} from 'services/user/constants';
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken';
import { selectLanguage, selectPublicKey } from 'services/configuration/selectors';
import {
  authorizationError,
  userLoggedIn as userLoggedInAction,
  logOut as logOutAction,
  refreshToken as refreshTokenAction,
  changeUserPersonalData as changeUserPersonalDataAction,
  accountRemoved,
} from './actions';
import { showNotifications } from 'services/notifications/actions';
import { NOTIFICATION_TYPES } from 'services/notifications/constants';
import { STORED_USER_KEY } from 'services/localStorage/constants';
import { getUserDataError } from 'services/user/helpers';
import { goToGifs } from 'scenes/GifSearcher/actions';
import { resetSearch } from 'services/giphyProvider/actions';
import { CONFIG_SET_LANGUAGUE } from 'services/configuration/constants';
import { selectUser } from 'services/user/selectors';
import { setLanguage } from 'services/configuration/actions';

function* signUpUser({ signUpUser }, { payload: user }) {
  try {
    const language = yield select(selectLanguage);
    const signedUser = yield call(
      signUpUser,
      {
        ...omit(user, ['confirmPassword']),
        language,
      }
    );
    if(yield call(doLogIn, signedUser)) {
      yield put(goToGifs());
      yield put(showNotifications({type: NOTIFICATION_TYPES.INFO, textId: 'notification_user_logged_in'}));
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
      yield put(goToGifs());
      yield put(showNotifications({type: NOTIFICATION_TYPES.INFO, textId: 'notification_user_logged_in'}));
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
  yield put(resetSearch());
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
  const user = yield select(selectUser);

  if (userFromToken) {
    if(!user)
      yield put(setLanguage(userFromToken.language));
    yield put(userLoggedInAction({
      userObj: userFromToken,
      token: userToken,
    }));
    yield put(resetSearch());
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
  yield put(goToGifs());
  yield call(removeUserAccount);
  yield call(localStorage.removeItem, STORED_USER_KEY);
  yield put(accountRemoved());
  yield put(showNotifications({
    type: NOTIFICATION_TYPES.INFO,
    textId: 'account_removed',
  }))
  yield put(resetSearch());
}

function* languageChange({ payload: language}) {
  const user = yield select(selectUser);
  if(user)
    yield put(changeUserPersonalDataAction({ language }));
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
  yield takeEvery(CONFIG_SET_LANGUAGUE, languageChange);
};
