import React  from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectGifData, selectIsSearching } from "services/giphyProvider/selectors";
import { chunk } from 'lodash';
import Gif from "components/Gif/Gif";
import Loader from 'react-loader-spinner';
import TopBar from "components/topBar/topBar";
import { PATH as GIF_SEARCHER_PATH } from '../constants'
import { PATH as GIF_VIEWER_PATH } from 'scenes/GifViewer/constants'
import useSearch from "services/search/useSearch";
import withInfiniteLoading from "hocs/withInfiniteLoading";
import './GifSearcher.css'

const chunkSize = 6;
const GifSearcher = () => {
  const gifData = useSelector(selectGifData);
  const isSearching = useSelector(selectIsSearching);
  const dispatch = useDispatch();
  const [search, changeSearch] = useSearch(GIF_SEARCHER_PATH);
  const { query } = search;
  const rowChunks = chunk(gifData, chunkSize);

  const changeQuery = (newSearchText) => changeSearch({ query: newSearchText })
  const onGifClick = (position) => () => dispatch(
    push({ pathname: GIF_VIEWER_PATH, search: qs.stringify({ position, ...search }) })
  );

  return <>
    <TopBar query={query} changeQuery={changeQuery}/>
    {isSearching && gifData.length === 0 &&
    <div className='big-loader-wrapper'>
      <Loader type="Rings" color='blue' height={200} width={200}/>
    </div>}
    {gifData && <div className="container">
      {
        rowChunks.map((rowChunk, chunkIndex) => (
            <div className="row mb-4" key={chunkIndex}>
              {rowChunk.map((gif, rowIndex) => (
                <div className="col-md-2" key={gif.id}>
                  <Gif gifUrl={gif.smallUrl} onClick={onGifClick((chunkIndex)* chunkSize + rowIndex)}/>
                </div>))}
            </div>
          )
        )
      }
    </div>}
    {isSearching && gifData.length > 0 &&
    <div className='small-loader-wrapper'>
      <Loader type="Rings" color='blue' height={100} width={100}/>
    </div>}
    {!isSearching && <div className="gif-searcher-bottom-spacing"/>}
  </>
};

export default withInfiniteLoading(GifSearcher);
