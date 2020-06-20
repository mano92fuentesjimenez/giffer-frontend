import React from 'react';
import ReactModal from 'react-modal';
import bem from 'bem-cn';
import { getLocation } from 'connected-react-router';
import { modalPaths } from 'services/modal-service/constants';
import { useDispatch, useSelector } from 'react-redux';
import './Modal.scss';
import CloseBtn from 'components/CloseBtn/CloseBtn';
import { goToGifs } from 'scenes/GifSearcher/actions';

const b = bem('component-modal');

const ModalService = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useSelector(getLocation);
  const showModal = modalPaths.includes(pathname);
  modalPaths.forEach(v => console.log(v))

  if(showModal){
    // hack to not scroll background page
    document.body.style.overflow = 'hidden';
  }
  else document.body.style.overflow = 'auto';

  const onRequestClose = () => dispatch(goToGifs());

  return <ReactModal
    isOpen={showModal}
    className={b()}
    overlayClassName={b('overlay')()}
    onRequestClose={onRequestClose}
  >
    <div className={b('content-container')()}>
      <CloseBtn className={b('close-btn')()} onClick={onRequestClose}/>
      {children}
    </div>
  </ReactModal>
}

export default ModalService;