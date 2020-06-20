import React from 'react';
import withHadSearched from 'hocs/withHadSearched';
import { PATH as GIFS_PATH } from 'scenes/GifSearcher'
import CarouselViewer from './CarouselViewer';
import { Redirect } from 'react-router-dom';

const GifViewer = ({ hadSearched, ...props }) => {

  if(!hadSearched) {
    return <Redirect to={GIFS_PATH} />
  }

  return <CarouselViewer {...props}/>
}

export default withHadSearched(GifViewer);