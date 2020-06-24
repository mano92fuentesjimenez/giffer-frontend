import React from 'react';
import bem from 'bem-cn';
import Image from 'components/Image/Image';
import emptyIcon from 'images/empty-icon.png';
import { FormattedMessage } from 'react-intl';
import './EmptySearch.scss'

const b = bem('scenes-gif-searcher-empty-search');
const EmptySearch = () => {

  return (
    <div className={b()}>
      <Image
        className={b('image')()}
        src={emptyIcon}
      />
      <div className={b('error-description')()}>
        <FormattedMessage id='empty_search_message'/>
      </div>
    </div>
  )
}

export default EmptySearch;