import React from 'react';
import SearchInput from "../SearchInput/SearchInput";
import "./top-bar.css";

const TopBar = ({ query, changeQuery }) => (
  <div className="top-bar-container">
    <div className="top-bar">
      <div className='search-input-container'>
        <SearchInput query={query} changeQuery={changeQuery}/>
      </div>
    </div>
  </div>
);

export default TopBar;
