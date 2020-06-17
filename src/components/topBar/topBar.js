import React from 'react';
import SearchInput from "../SearchInput/SearchInput";
import "./top-bar.css";

const TopBar = () => (
  <div className="top-bar-container">
    <div className="top-bar">
      <div className='search-input-container'>
        <SearchInput/>
      </div>
    </div>
  </div>
);

export default TopBar;
