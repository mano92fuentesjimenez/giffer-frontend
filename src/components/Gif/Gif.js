import React from 'react';
import './Gif.css'
import classname from 'classname';

const Gif = ({ gifUrl, onClick }) => (
  <div className={classname('gif-wrapper', {'gif-hover': onClick })}>
    <img src={gifUrl} alt={'gif'} onClick={onClick} />
  </div>
);

export default Gif;
