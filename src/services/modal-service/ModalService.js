import React from 'react';
import ReactModal from 'react-modal';
import bem from 'bem-cn';
import { getLocation } from 'connected-react-router';
import { modalPaths } from 'services/modal-service/constants';
import { useSelector } from 'react-redux';
import './Modal.scss';

const b = bem('component-modal');

const ModalService = ({
  children,
  onAfterOpen,
}) => {
  const { pathname } = useSelector(getLocation);
  const showModal = modalPaths.includes(pathname);
  modalPaths.forEach(v => console.log(v))

  if(showModal){
    // hack to not scroll background page
    document.body.style.overflow = 'hidden';
  }
  else document.body.style.overflow = 'auto';

  return <ReactModal
    isOpen={showModal}
    className={b()}
    overlayClassName={b('overlay')()}
    onAfterOpen={onAfterOpen}
  >
    {children}
  </ReactModal>
}

export default ModalService;