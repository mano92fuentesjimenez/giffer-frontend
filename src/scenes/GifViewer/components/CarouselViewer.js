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

const b = bem('scene-gif-viewer');

const gifsToShow = 10;
const CarouselViewer = ({ location: { search }}) => {

  const dispatch = useDispatch();
  const gifs = useSelector(selectGifData);
  const searchObj = getSearch(search);
  const [selectedGif, setSelectedGif] = useState(+searchObj.position);
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
    return () => window.removeEventListener('resize', calculateGifWidth);
    // eslint-disable-next-line
  }, [])

  const onRequestClose = () => dispatch(push({ pathname: PATH, search: getStringFromSearch(search)}))
  const onGifSelected = (gifPosition) => setSelectedGif(gifPosition);
  const onGoToPreviousGifs = () => setFirstGif(Math.max(firstGif - gifsToShow, 0));
  const onGoToNextGifs = () => setFirstGif(Math.min(firstGif + gifsToShow, gifs.length - 1));

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      onAfterOpen={calculateGifWidth}
    >
      <div className={b()} ref={containerRef}>
        <div className={b('main-gif-container')()}>
          <Gif gifUrl={gifs[selectedGif].largeUrl}/>
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
                    selected={index === selectedGif}
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