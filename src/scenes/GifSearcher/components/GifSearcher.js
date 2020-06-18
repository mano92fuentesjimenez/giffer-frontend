import React  from 'react';
import { useSelector } from "react-redux";
import { selectGifData, selectIsSearching } from "services/giphyProvider/selectors";
import { chunk } from 'lodash';
import Gif from "components/Gif/Gif";
import Loader from 'react-loader-spinner';
import TopBar from "components/topBar/topBar";
import { PATH as GIF_SEARCHER_PATH }from '../constants'
import useSearch from "services/search/useSearch";
import './GifSearcher.css'
import withInfiniteLoading from "hocs/withInfiniteLoading";

const GifSearcher = () => {
  const gifData = useSelector(selectGifData);
  const isSearching = useSelector(selectIsSearching);
  const [{ query }, changeSearch] = useSearch(GIF_SEARCHER_PATH);
  const rowChunks = chunk(gifData, 6);

  const changeQuery = (newSearchText) => changeSearch({ query: newSearchText })

  return <>
    <TopBar query={query} changeQuery={changeQuery}/>
    {isSearching && gifData.length === 0 &&
    <div className='big-loader-wrapper'>
      <Loader type="Rings" color='blue' height={200} width={200}/>
    </div>}
    {gifData && <div className="container">
      {
        rowChunks.map((rowChunk, index) => (
            <div className="row mb-4" key={index}>
              {rowChunk.map(gif => (
                <div className="col-md-2" key={gif.id}>
                  <Gif gifUrl={gif.smallUrl}/>
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
