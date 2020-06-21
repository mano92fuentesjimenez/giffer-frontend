import { takeEvery, call, select, put } from 'redux-saga/effects';
import { PATH as GIFS_PATH } from 'scenes/GifSearcher';
import { push } from 'connected-react-router';
import { SIGN_UP_USER, USER_LOGGED_IN } from 'services/user/constants';
import jsonwebtoken from 'jsonwebtoken';
import { selectPublicKey } from 'services/configuration/selectors';
import { userLoggedIn as userLoggedInAction } from './actions';

function* signUpUser({ signUpUser }, { payload: user }) {
  const signedUser = yield call(signUpUser, user);
  const publicKey = yield select(selectPublicKey);

  const userObj = yield call(jsonwebtoken.verify, signedUser, publicKey, { algorithms: ['RS512']});
  yield put(userLoggedInAction(userObj));
}

function* userLoggedIn() {
  yield put(push(GIFS_PATH))
}

export default function* ({ api }) {
  yield takeEvery(SIGN_UP_USER, signUpUser, api);
  yield takeEvery(USER_LOGGED_IN, userLoggedIn, api);
};
