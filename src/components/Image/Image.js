import React from 'react';
import bem from 'bem-cn'
import './Image.scss';

const b = bem('components-image');

const Image = ({ className, onClick, alt, src }) => {
  return (
    <div className={b.mix(className)()}>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  )
}

export default Image;