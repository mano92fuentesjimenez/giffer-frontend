import React from 'react';
import SearchInput from '../SearchInput/SearchInput';
import bem from 'bem-cn'
import UserBtn from 'components/UserBtn/UserBtn';
import './TopBar.scss';

const b = bem('components-top-bar');
const TopBar = ({ query, changeQuery }) => (
  <div className={b()}>
    <div className={b('top-bar')()}>
      <span className={b('app-title')()}>Giffer</span>
      <SearchInput query={query} changeQuery={changeQuery}/>
      <UserBtn />
    </div>
  </div>
);

export default TopBar;
