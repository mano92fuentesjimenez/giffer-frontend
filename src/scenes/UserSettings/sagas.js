import { takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';

function* locationChanged() {

}

export default function* () {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
};