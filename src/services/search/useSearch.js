import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { SearchContext } from "./context";
import { getStringFromSearch } from "./helpers";

const useSearch = (pathname) => {
  const dispatch = useDispatch();
  const search = useContext(SearchContext);

  const updateSearch = (newSearch) => {
    dispatch(push({ pathname, search: getStringFromSearch(newSearch) }));
  }

  return [search, updateSearch];
}

export default useSearch;