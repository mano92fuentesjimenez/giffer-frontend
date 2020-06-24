import React from 'react';
import bem from 'bem-cn';
import Image from 'components/Image/Image';
import emptyIcon from 'images/empty-icon.png';
import emptyFavoritesIcon from 'images/empty-favorits-icon.png';
import { FormattedMessage } from 'react-intl';
import useSearch from 'services/search/useSearch';
import { SEARCH_TYPES } from 'services/search/constants';
import './EmptySearch.scss'

const b = bem('scenes-gif-searcher-empty-search');
const EmptySearch = () => {
  const [search] = useSearch();
  const isFavorites = search.type === SEARCH_TYPES.FAVORITES;

  const icon = isFavorites ? emptyFavoritesIcon : emptyIcon
  const messageId = isFavorites ? 'empty_favorites_message' : 'empty_search_message'
  return (
    <div className={b()}>
      <Image
        className={b('image')()}
        src={icon}
      />
      <div className={b('error-description')()}>
        <FormattedMessage id={messageId}/>
      </div>
    </div>
  )
}

export default EmptySearch;