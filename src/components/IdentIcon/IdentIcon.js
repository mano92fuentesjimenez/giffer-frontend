import React from 'react';
import blockies from 'blockies';
import bem from 'bem-cn';
import Image from '../Image/Image';
import './IdentIcon.scss';

const b = bem('components-identicon');

const Identicon = ({ value, className= '' }) => {
  const canvas = blockies({
    seed: value || '  ',
    color: '#aea9a9',
    bgcolor: '#000',
    size: 8,
    scale: 5,
  });
  return (
    <div className={b()}>
      <Image src={canvas.toDataURL()} className={b('image-modifier')()}/>
    </div>
  );
};

export default Identicon;
