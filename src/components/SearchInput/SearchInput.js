import React from 'react';
import bem from 'bem-cn'
import Image from 'components/Image/Image';
import searchIconSrc from 'images/search-icon.png';
import './SearchInput.scss'
import { useDispatch } from 'react-redux';
import { resetSearch } from 'services/giphyProvider/actions';
import { useIntl } from 'react-intl';

const b = bem('components-search-input');
const SearchInput = ({ query ='', changeQuery }) => {
  const dispatch = useDispatch();
  const onSearchClick = () => dispatch(resetSearch());
  const intl = useIntl();

  return <div className={b()}>
    <input
      onChange={(e) => changeQuery(e.target.value)}
      value={query}
      placeholder={intl.formatMessage({id: 'search'})}
    />
    <Image src={searchIconSrc} className={b('search-icon')()} onClick={onSearchClick}/>
  </div>
};

export default SearchInput;
