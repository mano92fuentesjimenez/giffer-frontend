import React, { useState, useLayoutEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import getSearch from 'helpers/getSearch';
import { selectGifData, selectIsSearching } from 'services/giphyProvider/selectors';
import { loadMore } from 'services/giphyProvider/actions';
import withContainerWidth from 'hocs/withContainerWidth';
import Responsive, { largeScreeMediaQUery, midScreenMediaQuery, mobileMediaQuery } from 'services/Responsive';
import CarouselViewerLarge from 'scenes/GifViewer/components/CarouselViewer.large';
import CarouselViewerMobile from 'scenes/GifViewer/components/CarouselViewer.mobile';
import { useMediaQuery } from 'react-responsive';
import './CarouselViewer.scss'

const ResponsiveComponent = Responsive({
  LargeDesktop: CarouselViewerLarge,
  MidDesktop: CarouselViewerLarge,
  Mobile: CarouselViewerMobile,
})

let gifsToShow = 10;
const CarouselViewer = ({ location: { search }, width}) => {

  const isMidScreen = useMediaQuery(midScreenMediaQuery);
  const isLargeScreen = useMediaQuery(largeScreeMediaQUery);
  const isMobileScreen = useMediaQuery(mobileMediaQuery);

  if(isMidScreen)
    gifsToShow = 5;
  if(isLargeScreen)
    gifsToShow = 10;
  if(isMobileScreen)
    gifsToShow = 1;

  const dispatch = useDispatch();
  const gifs = useSelector(selectGifData);
  const isLoading = useSelector(selectIsSearching);
  const searchObj = getSearch(search);
  const [selectedGifPosition, setSelectedGifPosition] = useState(+searchObj.position);
  const [gifWidth, setGifWidth] = useState(0);
  const [firstGif, setFirstGif] = useState(0);

  useLayoutEffect(() => {
    setFirstGif(Math.max(selectedGifPosition - gifsToShow / 2 - 1, firstGif));
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    setGifWidth((width - 68) / gifsToShow);
  }, [width]);

  const onGifSelected = (gifPosition) => setSelectedGifPosition(gifPosition);
  const onGoToPreviousGifs = () => setFirstGif(Math.max(firstGif - gifsToShow, 0));
  const onGoToNextGifs = () => {
    if (firstGif + gifsToShow > gifs.length - 1)
      return dispatch(loadMore());

    setFirstGif(Math.min(firstGif + gifsToShow, gifs.length - gifsToShow));
  }

  const selectedGif = gifs[gifsToShow === 1 ? firstGif : selectedGifPosition];
  const props = {
    selectedGif,
    firstGif,
    gifs,
    onGoToPreviousGifs,
    gifWidth,
    onGifSelected,
    selectedGifPosition,
    isLoading,
    onGoToNextGifs,
  }
  return (
    <ResponsiveComponent {...props}/>
  )
}

export default withContainerWidth(CarouselViewer);