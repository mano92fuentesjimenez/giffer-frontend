import React from 'react';
import Gif from 'components/Gif/Gif';
import { GIFF_SIZES } from 'constants/constants';
import GifMetadata from 'components/GifMetadata/GifMetadata';
import ArrowButton from 'components/ArrowButton/ArrowButton';
import Loader from 'react-loader-spinner';
import bem from 'bem-cn';

const b = bem('scene-gif-viewer');
const CarouselViewerMobile = ({
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
    <div className="d-flex align-items-center">
      <ArrowButton
        orientation={'left'}
        disabled={firstGif === 0}
        onClick={onGoToPreviousGifs}
      />
      <div className='flex-grow-1 px-2'>
        <Gif gif={selectedGif} size={GIFF_SIZES.LARGE}/>
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
    <div className={b('metadata-container')()}>
      <GifMetadata gif={selectedGif}/>
    </div>
  </div>
)

export default CarouselViewerMobile;