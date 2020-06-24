import React from 'react';
import bem from 'bem-cn';
import Image from 'components/Image/Image';
import { GIFF_SIZES } from 'constants/constants';
import favoriteIcon from 'images/favorite-icon.png';
import nonFavoriteIcon from 'images/non-favorite-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteGif } from 'services/giphyProvider/actions';
import { selectGifToggingFavorite } from 'services/giphyProvider/selectors';
import { selectUser } from 'services/user/selectors';
import './Gif.scss';

const b = bem('components-gif');
const Gif = ({ gif, onClick, selected, size = GIFF_SIZES.SMALL }) => {
  const gifUrl = size === GIFF_SIZES.SMALL ? gif.smallUrl : gif.largeUrl;
  const {isFavorite} = gif

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const gifTogglingFavorite = useSelector(selectGifToggingFavorite);
  const isToggling = gifTogglingFavorite.find(gifId => gif.id === gifId);
  const onToggleFavoriteGif = () => dispatch(toggleFavoriteGif(gif.id));

  return <div className={b()}>
    <Image
      className={b({selected: !!selected, 'gif-hover': !!onClick})()}
      src={gifUrl}
      onClick={onClick}
      alt="gif"
    />
    {
      user &&
      <div
        className={b('star-container')({isFavorite, isToggling: !!isToggling})()}
      >
        <Image
          src={isFavorite ? favoriteIcon : nonFavoriteIcon}
          onClick={onToggleFavoriteGif}
          alt=''
        />
      </div>
    }
  </div>
};

export default Gif;
