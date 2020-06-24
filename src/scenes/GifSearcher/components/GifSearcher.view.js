import React  from 'react';
import TopBar from 'components/TopBar/TopBar';
import Loader from 'react-loader-spinner';
import Gif from 'components/Gif/Gif';
import EmptySearch from 'scenes/GifSearcher/components/EmptySearch';
import { chunk } from 'lodash';
import bem from 'bem-cn';
import './GifSearcher.view.scss';

const b = bem('scenes-gif-searcher');
const GifSearcherView = chunkSize => ({ query, changeQuery, gifData, isSearching, onGifClick }) => {

  const rowChunks = chunk(gifData, chunkSize);
  return <>
    <TopBar query={query} changeQuery={changeQuery}/>
    {
      isSearching && gifData.length === 0 &&
      <div className={b('big-loader-wrapper')()}>
        <Loader type="Rings" color='blue' height={200} width={200}/>
      </div>
    }
    {
      gifData &&
      <div className={b('gifs-container').mix("container")()}>
        {
          rowChunks.map((rowChunk, chunkIndex) => (
              <div className="row mb-4" key={chunkIndex}>
                {rowChunk.map((gif, rowIndex) => (
                  <div className={`col-${12/chunkSize} col-sm-${12/chunkSize}`} key={gif.id}>
                    <Gif gif={gif} onClick={onGifClick((chunkIndex) * chunkSize + rowIndex)}/>
                  </div>))}
              </div>
            )
          )
        }
      </div>
    }
    {
      !isSearching && gifData.length === 0 && <EmptySearch/>
    }
    {
      isSearching && gifData.length > 0 &&
      <div className={b('small-loader-wrapper')()}>
        <Loader type="Rings" color='blue' height={100} width={100}/>
      </div>
    }
    {!isSearching && <div className={b('gif-searcher-bottom-spacing')()}/>}
  </>
}

export default GifSearcherView;