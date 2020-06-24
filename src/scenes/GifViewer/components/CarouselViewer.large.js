import React from 'react';
import Gif from 'components/Gif/Gif';
import { GIFF_SIZES } from 'constants/constants';
import GifMetadata from 'components/GifMetadata/GifMetadata';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import Loader from 'react-loader-spinner';
import bem from 'bem-cn';

const b = bem('scene-gif-viewer');
const CarouselViewerLarge = ({
   selectedGif,
   firstGif,
   gifs,
   onGoToPreviousGifs,
   gifWidth,
   onGifSelected,
   selectedGifPosition,
   isLoading,
   onGoToNextGifs,
}) => (
  <div className={b()}>
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

export default CarouselViewerLarge;