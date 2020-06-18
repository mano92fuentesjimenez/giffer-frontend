import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getSearch } from 'connected-react-router';
import { getSearchFromString } from "./helpers";

export const SearchContext = React.createContext(null);

export const SearchProvider = ({ children }) => {
  const query = useSelector(getSearch);

  const search = useMemo(() =>
    (getSearchFromString(query)),
    [query]
  );

  return (
    <SearchContext.Provider value={search}>
      {children}
    </SearchContext.Provider>
  );
};
