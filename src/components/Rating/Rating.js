import React from 'react';
import bem from 'bem-cn'
import './Rating.scss';

const b = bem('components-rating');

const images =  {
  g: require('images/RATED_G.png'),
  pg: require('images/RATED_PG.png'),
  r: require('images/RATED_R.png'),
  'pg-13': require('images/RATED_PG-13.png'),
}

const Rating = ({ rating }) => {
  return <div className={b({ rating })()}>
    <img src={images[rating]} alt={rating}/>
  </div>
}

export default Rating