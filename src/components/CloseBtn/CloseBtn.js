import React from 'react';
import bem from 'bem-cn';
import './CloseBtn.scss';

const b = bem('components-close-btn');

const CloseBtn = ({ onClick, className }) => {
  return <div onClick={onClick} className={b.mix(className)()}/>
}

export default CloseBtn;