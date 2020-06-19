import React from 'react';
import bem from 'bem-cn';
import Rating from 'components/Rating/Rating';
import { FormattedDate } from 'react-intl';
import './GifMetadata.scss';

const b = bem('components-gif-metadata');
const GifMetadata = ({ gif }) => {
  const { metaData: {
    title,
    creationTime,
    trendingTime,
    userName,
    rating,
  } } = gif;
  return (
    <div className={b()}>
      {title && <div className={b('row')()}>
          <div className={b('field')()}><h4>Title</h4></div>
          <div className={b('value')()}><h4>{title}</h4></div>
        </div>
      }
      {userName && <div className={b('row')()}>
          <div className={b('field')()}><h4>Uploaded By</h4></div>
          <div className={b('value')()}><h4>{userName}</h4></div>
        </div>
      }
      <div className={b('row')()}>
        <div className={b('field')()}><h4>Rating</h4></div>
        <div className={b('value')()}><Rating rating={rating}/></div>
      </div>
      { creationTime && <div className={b('row')()}>
          <div className={b('field')()}><h4>Creation Time</h4></div>
          <div className={b('value')()}><FormattedDate value={new Date(creationTime)}/></div>
        </div>
      }
      { trendingTime && <div className={b('row')()}>
          <div className={b('field')()}><h4>Trending Time</h4></div>
          <div className={b('value')()}><FormattedDate value={new Date(trendingTime)}/></div>
        </div>
      }
    </div>
  )
}

export default GifMetadata;