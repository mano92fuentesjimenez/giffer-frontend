import {
  GIFS_START_LOADING,
  GIFS_LOADED,
  SEARCH_GIFS,
  SEARCH_TRENDING_GIFS,
  LOAD_MORE,
  STOP_SEARCH,
  RESET_SEARCH,
  TOGGLE_FAVORITE_GIF,
  FAVORITE_GIF_TOGGLED, SEARCH_FAVORITES,
} from './constants';

export const searchGifs = (search) => ({ type: SEARCH_GIFS, payload: search });
export const searchTrendingGifs = () => ({ type: SEARCH_TRENDING_GIFS });
export const searchFavoriteGifs = () => ({ type: SEARCH_FAVORITES });
export const startLoadingGifs = () => ({ type: GIFS_START_LOADING });
export const gifsLoaded = (data) => ({ type: GIFS_LOADED, payload: data });
export const loadMore = () => ({ type: LOAD_MORE });
export const stopSearch = () => ({ type: STOP_SEARCH });
export const resetSearch = () => ({ type: RESET_SEARCH });
export const toggleFavoriteGif = (gifId) => ({ type: TOGGLE_FAVORITE_GIF, payload: gifId })
export const favoriteGifToggled = (gifId) => ({ type: FAVORITE_GIF_TOGGLED, payload: gifId })
