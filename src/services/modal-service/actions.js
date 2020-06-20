import { CLOSE_MODAL } from 'services/modal-service/constants';

export const closeModal = ( pathObj ) => ({ type: CLOSE_MODAL, payload: pathObj });