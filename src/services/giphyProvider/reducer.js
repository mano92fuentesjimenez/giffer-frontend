import {GIFS_LOADED, GIFS_START_LOADING} from "./constants";

const initialState = {
  gifs: [],
  searching: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GIFS_START_LOADING:
      return {
        ...state,
        gifs: [],
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
