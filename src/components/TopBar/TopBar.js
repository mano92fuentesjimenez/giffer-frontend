import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import bem from 'bem-cn'
import UserBtn from 'components/UserBtn/UserBtn';
import './TopBar.scss';
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import FavoritesFilter from 'components/FavoritesFilter/FavoritesFilter';
import Responsive from 'services/Responsive';

const b = bem('components-top-bar');
const TopBar = isBig => ({ query, changeQuery }) => (
  <div className={b()}>
    <div className={b('top-bar').mix('container')()}>
      <span className={b('app-title')()}>Giffer</span>
      <div className="d-flex align-items-center flex-grow-1 justify-content-center">
        <SearchInput query={query} changeQuery={changeQuery}/>
        {isBig && <FavoritesFilter/>}
        {isBig && <LanguageSelector/>}
      </div>
      <UserBtn />
    </div>
  </div>
);

const ResponsiveTopBar = Responsive({
  Mobile: TopBar(false),
  MidDesktop: TopBar(true),
  LargeDesktop: TopBar(true),
})

export default ResponsiveTopBar;
