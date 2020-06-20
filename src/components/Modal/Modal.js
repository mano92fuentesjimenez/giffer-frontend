import React from 'react';
import ReactModal from 'react-modal';
import bem from 'bem-cn';
import './Modal.scss';
import CloseBtn from 'components/CloseBtn/CloseBtn';

const b = bem('component-modal');
const Modal = ({
  children,
  isOpen,
  onRequestClose,
  onAfterOpen,
}) => {
  return <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={b()}
    overlayClassName={b('overlay')()}
    onAfterOpen={onAfterOpen}
  >
    <CloseBtn
      className={b('close-btn')()}
      onClick={onRequestClose}
    />
    {children}
  </ReactModal>
}

export default Modal;