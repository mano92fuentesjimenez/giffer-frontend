import { takeEvery, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from "connected-react-router";
import { PATH as LOGIN_PATH } from './constants'
import { cleanAuthorizationErrors } from 'services/user/actions';

function* locationChange({ payload: { location }}){
  if(location.pathname === LOGIN_PATH){
    yield put(cleanAuthorizationErrors())
  }
}

export default function* () {
  yield takeEvery(LOCATION_CHANGE, locationChange,);
};
