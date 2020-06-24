import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import bem from 'bem-cn'
import UserBtn from 'components/UserBtn/UserBtn';
import './TopBar.scss';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import FavoritesFilter from 'components/FavoritesFilter/FavoritesFilter';

const b = bem('components-top-bar');
const TopBar = ({ query, changeQuery }) => (
  <div className={b()}>
    <div className={b('top-bar')()}>
      <span className={b('app-title')()}>Giffer</span>
      <div className="d-flex align-items-center">
        <SearchInput query={query} changeQuery={changeQuery}/>
        <FavoritesFilter/>
        <LanguageSelector/>
      </div>
      <UserBtn />
    </div>
  </div>
);

export default TopBar;
