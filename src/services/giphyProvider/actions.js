import {
  GIFS_START_LOADING,
  GIFS_LOADED,
  SEARCH_GIFS,
  SEARCH_TRENDING_GIFS,
  LOAD_MORE,
} from "./constants";

export const searchGifs = (search) => ({ type: SEARCH_GIFS, payload: search });
export const searchTrendingGifs = () => ({ type: SEARCH_TRENDING_GIFS });
export const startLoadingGifs = () => ({ type: GIFS_START_LOADING });
export const updateGifs = (data) => ({ type: GIFS_LOADED, payload: data });
export const loadMore = () => ({ type: LOAD_MORE });
