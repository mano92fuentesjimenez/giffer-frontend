import React  from 'react';
import {useSelector} from "react-redux";
import {selectGifData, selectIsSearching} from "services/giphyProvider/selectors";
import { chunk } from 'lodash';
import Gif from "components/Gif/Gif";
import Loader from 'react-loader-spinner';
import './GiphySearcher.css'
import TopBar from "components/topBar/topBar";

const GiphySearcher = () => {
  const gifData = useSelector(selectGifData);
  const isSearching = useSelector(selectIsSearching);
  const rowChunks = chunk(gifData, 6);

  return <>
    <TopBar/>
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
  </>
};

export default GiphySearcher;
