import React from 'react';
import bem from 'bem-cn';
import Image from 'components/Image/Image';
import './Gif.scss'

const b = bem('components-gif');
const Gif = ({ gifUrl, onClick, selected }) => (
  <Image
    className={b({ selected: !!selected, 'gif-hover': !!onClick })()}
    src={gifUrl}
    onClick={onClick}
    alt="gif"
  />
);

export default Gif;
