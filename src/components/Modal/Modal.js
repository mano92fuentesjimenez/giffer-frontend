import React from 'react';
import ReactModal from 'react-modal';
import bem from 'bem-cn';
import './Modal.scss';

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
    {children}
  </ReactModal>
}

export default Modal;