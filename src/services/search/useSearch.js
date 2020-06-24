import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { SearchContext } from "./context";
import { getStringFromSearch } from "./helpers";
import { SEARCH_TYPES } from 'services/search/constants';

const useSearch = (pathname) => {
  const dispatch = useDispatch();
  const search = useContext(SearchContext);

  const updateSearch = (newSearch) => {
     if(newSearch.type === SEARCH_TYPES.FAVORITES) {
      delete newSearch.query;
    }
    dispatch(push({ pathname, search: getStringFromSearch(newSearch) }));
  }

  return [search, updateSearch];
}

export default useSearch;