import React,{ useState, useEffect, useRef } from 'react';
import { push } from 'connected-react-router';
import {useDispatch, useSelector} from 'react-redux';
import { PATH } from 'scenes/GifSearcher';
import { getStringFromSearch } from 'services/search/helpers';
import Modal from 'components/Modal/Modal';
import getSearch from 'helpers/getSearch';
import { selectGifData } from 'services/giphyProvider/selectors';
import bem from 'bem-cn';
import Gif from 'components/Gif/Gif';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import './CarouselViewer.scss'
import GifMetadata from 'components/GifMetadata/GifMetadata';

const b = bem('scene-gif-viewer');

const gifsToShow = 10;
const CarouselViewer = ({ location: { search }}) => {

  const dispatch = useDispatch();
  const gifs = useSelector(selectGifData);
  const searchObj = getSearch(search);
  const [selectedGifPosition, setSelectedGifPosition] = useState(+searchObj.position);
  const containerRef = useRef(null);
  const [gifWidth, setGifWidth] = useState(0);
  const [firstGif, setFirstGif] = useState(0);

  const calculateGifWidth = () => {
    if(!containerRef.current)
      return;
    const { width } = containerRef.current.getBoundingClientRect();
    setGifWidth( (width - 28)/gifsToShow);
  }

  useEffect(() => {
    window.addEventListener('resize', calculateGifWidth);
    setFirstGif(Math.max(selectedGifPosition - gifsToShow / 2 - 1, firstGif));
    return () => window.removeEventListener('resize', calculateGifWidth);
    // eslint-disable-next-line
  }, [])

  const onRequestClose = () => dispatch(push({ pathname: PATH, search: getStringFromSearch(search)}))
  const onGifSelected = (gifPosition) => setSelectedGifPosition(gifPosition);
  const onGoToPreviousGifs = () => setFirstGif(Math.max(firstGif - gifsToShow, 0));
  const onGoToNextGifs = () => setFirstGif(Math.min(firstGif + gifsToShow, gifs.length - 1));

  const selectedGif = gifs[selectedGifPosition];
  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      onAfterOpen={calculateGifWidth}
    >
      <div className={b()} ref={containerRef}>
        <div className={b('main-container')()}>
          <div className={b('main-gif-container')()}>
            <Gif gifUrl={selectedGif.largeUrl}/>
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
              style={{ transform: `translate(-${firstGif * gifWidth}px)`}}
            >
              {gifs.map((gif, index) =>
                <div
                  className={b('gif-container')()}
                  key={gif.key}
                  style={{ width: gifWidth }}
                >
                  <Gif
                    gifUrl={gif.smallUrl}
                    onClick={() =>onGifSelected(index)}
                    selected={index === selectedGifPosition}
                  />
                </div>
              )}
            </div>
          </div>
          <ArrowButton
            disabled={firstGif === gifs.length - 1}
            onClick={onGoToNextGifs}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CarouselViewer;