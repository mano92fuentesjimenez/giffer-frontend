import React from 'react';
import { useSelector } from 'react-redux';
import { selectGifData } from 'services/giphyProvider/selectors';

const withHadSearched = Component => (props) => {
  const gifs = useSelector(selectGifData);

  const hadSearched = gifs.length > 0;

  return <Component {...props} hadSearched={hadSearched} />
}

export default withHadSearched;