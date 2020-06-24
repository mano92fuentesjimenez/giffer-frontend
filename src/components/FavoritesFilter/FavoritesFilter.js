import React from 'react';
import bem from 'bem-cn';
import useSearch from 'services/search/useSearch';
import favoriteIcon from 'images/favorite-icon.png';
import nonFavoriteIcon from 'images/non-favorite-icon.png';
import Image from 'components/Image/Image';
import { SEARCH_TYPES } from 'services/search/constants';
import { useSelector } from 'react-redux';
import { selectUser } from 'services/user/selectors';
import './FavoritesFilter.scss';

const b = bem('components-favorites-filter')
const FavoritesFilter = () => {
  const [search, updateSearch] = useSearch();
  const user = useSelector(selectUser);
  const isFiltering = search.type === SEARCH_TYPES.FAVORITES;
  const onFilterClick = () => updateSearch({ type: isFiltering ? SEARCH_TYPES.SEARCH : SEARCH_TYPES.FAVORITES })

  return (
    user && <div className={b()}>
      <Image
        src={isFiltering ? favoriteIcon : nonFavoriteIcon }
        onClick={onFilterClick}
      />
    </div>
  )
}

export default FavoritesFilter