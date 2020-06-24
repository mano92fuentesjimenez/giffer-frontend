import React  from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectGifData, selectIsSearching } from 'services/giphyProvider/selectors';
import { PATH as GIFS_PATH } from '../constants'
import { PATH as GIFS_VIEW_PATH } from 'scenes/GifViewer/constants'
import useSearch from "services/search/useSearch";
import withInfiniteLoading from "hocs/withInfiniteLoading";
import Responsive from 'services/Responsive';
import GifSearcherView from 'scenes/GifSearcher/components/GifSearcher.view';

const ResponsiveComponent = Responsive({
  LargeDesktop: GifSearcherView(6),
  MidDesktop: GifSearcherView(4),
  Mobile: GifSearcherView(2),
})

const GifSearcher = () => {
  const gifData = useSelector(selectGifData);
  const isSearching = useSelector(selectIsSearching);
  const dispatch = useDispatch();
  const [search, changeSearch] = useSearch(GIFS_PATH);
  const {query} = search;


  const changeQuery = (newSearchText) => changeSearch({query: newSearchText})
  const onGifClick = (position) => () => dispatch(
    push({pathname: GIFS_VIEW_PATH, search: qs.stringify({position, ...search})})
  );

  const props = {
    query,
    changeQuery,
    onGifClick,
    isSearching,
    gifData,
  }

  return <ResponsiveComponent {...props}/>
};

export default withInfiniteLoading(GifSearcher);
