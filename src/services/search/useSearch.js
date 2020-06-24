import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { SearchContext } from "./context";
import { getStringFromSearch } from "./helpers";
import { SEARCH_TYPES } from 'services/search/constants';
import { selectUser } from 'services/user/selectors';

const useSearch = (pathname) => {
  const dispatch = useDispatch();
  const search = useContext(SearchContext);
  const user = useSelector(selectUser)

  const updateSearch = (newSearch) => {
    if (newSearch.type === SEARCH_TYPES.FAVORITES) {
      delete newSearch.query;
    }
    if (!user && newSearch.type === SEARCH_TYPES.FAVORITES){
      newSearch.type = SEARCH_TYPES.TRENDING;
    }
    dispatch(push({pathname, search: getStringFromSearch(newSearch)}));
  }

  return [search, updateSearch];
}

export default useSearch;