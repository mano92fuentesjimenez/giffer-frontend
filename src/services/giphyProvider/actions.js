import {
  GIFS_START_LOADING,
  GIFS_LOADED,
  SEARCH_GIFS,
} from "./constants";

export const searchGifs = (search) => ({ type: SEARCH_GIFS, payload: search });
export const startLoadingGifs = () => ({ type: GIFS_START_LOADING });
export const updateGifs = (data) => ({ type: GIFS_LOADED, payload: data });
