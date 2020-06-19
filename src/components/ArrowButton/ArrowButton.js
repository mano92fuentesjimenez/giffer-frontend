import React from 'react';
import bem from 'bem-cn';
import 'components/ArrowButton/ArrowButton.scss'

const b = bem('components-arrow-btn');
const ArrowButton = ({ orientation, onClick, disabled }) => {
  return <div className={b({ orientation, disabled })()} onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 5 10">
      <path d="M5,0l5,5H0Z" transform="translate(5) rotate(90)" fill="black"/>
    </svg>
  </div>
}

export default ArrowButton;