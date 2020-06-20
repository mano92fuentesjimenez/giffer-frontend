import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CLOSE_MODAL } from 'services/modal-service/constants';

function* closeModal({ payload }) {
  yield put(push(payload));
}

export default function* () {
  yield takeEvery(CLOSE_MODAL, closeModal);
};