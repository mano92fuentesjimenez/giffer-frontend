import {
  GIFS_START_LOADING,
  SEARCH_TEXT_CHANGED,
  GIFS_LOADED
} from "./constants";


export const changeSearchText = (text) => ({ type: SEARCH_TEXT_CHANGED, payload: text });
export const startLoadingGifs = () => ({ type: GIFS_START_LOADING });
export const updateGifs = (data) => ({ type: GIFS_LOADED, payload: data });
