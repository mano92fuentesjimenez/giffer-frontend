import {GIFS_LOADED, GIFS_START_LOADING, SEARCH_TEXT_CHANGED} from "./constants";

const initialState = {
  searchText: '',
  gifs: [],
  searching: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return {
        ...state,
        searchText: action.payload,
      };
    case GIFS_START_LOADING:
      return {
        ...state,
        searching: true,
      };
    case GIFS_LOADED:
      return {
        ...state,
        gifs: action.payload,
        searching: false,
      }
    default:
      return state;
  }
}
