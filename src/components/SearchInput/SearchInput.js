import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectSearchText } from "services/giphyProvider/selectors";
import { changeSearchText } from "services/giphyProvider/actions";
import './SearchInput.css'

const SearchInput = () => {
  const rootSearchValue = useSelector(selectSearchText);
  const [searchText, setSearchText] = useState(rootSearchValue);
  const dispatch = useDispatch();

  const search = () => {
    dispatch(changeSearchText(searchText));
  };
  const onKeyDown = (e) => {
    if(e.key === 'Enter')
      search();
  };

  return <div className="search-input">
    <input
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={onKeyDown}
      value={searchText}/>
    <button onClick={search}> Search</button>
  </div>
};

export default SearchInput;
