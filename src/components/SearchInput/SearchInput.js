import React from 'react';
import './SearchInput.css'

const SearchInput = ({ query ='', changeQuery }) => {
  return <div className="search-input">
    <input
      onChange={(e) => changeQuery(e.target.value)}
      value={query}/>
  </div>
};

export default SearchInput;
