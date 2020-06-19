import React from 'react';
import bem from 'bem-cn';
import './Gif.scss'

const b = bem('components-gif');
const Gif = ({ gifUrl, onClick, selected }) => (
  <div className={b({ selected: !!selected, 'gif-hover': !!onClick })()}>
    <img src={gifUrl} alt={'gif'} onClick={onClick} />
  </div>
);

export default Gif;
