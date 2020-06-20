import React from 'react';
import bem from 'bem-cn';
import Rating from 'components/Rating/Rating';
import { FormattedDate, FormattedMessage } from 'react-intl';
import './GifMetadata.scss';
import isValidDate from 'helpers/isValidDate';

const b = bem('components-gif-metadata');
const GifMetadata = ({ gif }) => {
  const { metaData: {
    title,
    creationTime,
    trendingTime,
    userName,
    rating,
  } } = gif;

  const creationTimeDate = new Date(creationTime);
  const trendingTimeDate = new Date(trendingTime);

  return (
    <div className={b()}>
      {title && <div className={b('row')()}>
          <div className={b('field')()}><h4><FormattedMessage id={'tittle'}/></h4></div>
          <div className={b('value')()}><h4>{title}</h4></div>
        </div>
      }
      {userName && <div className={b('row')()}>
          <div className={b('field')()}><h4><FormattedMessage id={'uploadedBy'}/></h4></div>
          <div className={b('value')()}><h4>{userName}</h4></div>
        </div>
      }
      <div className={b('row')()}>
        <div className={b('field')()}><h4><FormattedMessage id={'rating'}/></h4></div>
        <div className={b('value')()}><Rating rating={rating}/></div>
      </div>
      { creationTime && isValidDate(creationTimeDate) && <div className={b('row')()}>
          <div className={b('field')()}><h4><FormattedMessage id={'creationTime'}/></h4></div>
          <div className={b('value')()}><FormattedDate value={creationTimeDate}/></div>
        </div>
      }
      { trendingTime && isValidDate(trendingTimeDate) && <div className={b('row')()}>
          <div className={b('field')()}><h4><FormattedMessage id={'trendingTime'}/></h4></div>
          <div className={b('value')()}><FormattedDate value={trendingTimeDate}/></div>
        </div>
      }
    </div>
  )
}

export default GifMetadata;