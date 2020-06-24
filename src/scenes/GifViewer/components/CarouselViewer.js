import React,{ useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import getSearch from 'helpers/getSearch';
import { selectGifData, selectIsSearching } from 'services/giphyProvider/selectors';
import bem from 'bem-cn';
import Gif from 'components/Gif/Gif';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import GifMetadata from 'components/GifMetadata/GifMetadata';
import { loadMore } from 'services/giphyProvider/actions';
import Loader from 'react-loader-spinner';
import withContainerWidth from 'hocs/withContainerWidth';
import './CarouselViewer.scss'
import { GIFF_SIZES } from 'constants/constants';

const b = bem('scene-gif-viewer');

const gifsToShow = 10;
const CarouselViewer = ({ location: { search }, width}) => {

  const dispatch = useDispatch();
  const gifs = useSelector(selectGifData);
  const isLoading = useSelector(selectIsSearching);
  const searchObj = getSearch(search);
  const [selectedGifPosition, setSelectedGifPosition] = useState(+searchObj.position);
  const containerRef = useRef(null);
  const [gifWidth, setGifWidth] = useState(0);
  const [firstGif, setFirstGif] = useState(0);

  useEffect(() => {
    setFirstGif(Math.max(selectedGifPosition - gifsToShow / 2 - 1, firstGif));
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setGifWidth((width - 68) / gifsToShow);
  }, [width])

  const onGifSelected = (gifPosition) => setSelectedGifPosition(gifPosition);
  const onGoToPreviousGifs = () => setFirstGif(Math.max(firstGif - gifsToShow, 0));
  const onGoToNextGifs = () => {
    if (firstGif + gifsToShow > gifs.length - 1)
      return dispatch(loadMore());

    setFirstGif(Math.min(firstGif + gifsToShow, gifs.length - gifsToShow));
  }

  const selectedGif = gifs[selectedGifPosition];
  return (
    <div className={b()} ref={containerRef}>
      <div className={b('main-container')()}>
        <div className={b('main-gif-container')()}>
          <Gif gif={selectedGif} size={GIFF_SIZES.LARGE}/>
        </div>
        <div className={b('metadata-container')()}>
          <GifMetadata gif={selectedGif}/>
        </div>
      </div>
      <div className={b('carousel-holder')()}>
        <ArrowButton
          orientation={'left'}
          disabled={firstGif === 0}
          onClick={onGoToPreviousGifs}
        />
        <div className={b('carousel-container')()}>
          <div
            className={b('carousel')()}
            style={{transform: `translate(-${firstGif * gifWidth}px)`}}
          >
            {gifs.map((gif, index) =>
              <div
                className={b('gif-container')()}
                key={gif.id}
                style={{width: gifWidth}}
              >
                <Gif
                  gif={gif}
                  onClick={() => onGifSelected(index)}
                  selected={index === selectedGifPosition}
                />
              </div>
            )}
          </div>
        </div>
        <ArrowButton
          className={isLoading ? 'invisible' : ''}
          onClick={onGoToNextGifs}
        />
        {
          isLoading &&
          <div className={b('loader-container')()}>
            <Loader type="Rings" color='blue' height={80} width={80}/>
          </div>
        }
      </div>
    </div>
  )
}

export default withContainerWidth(CarouselViewer);