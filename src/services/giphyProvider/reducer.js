import {GIFS_LOADED, GIFS_START_LOADING, SEARCH_GIFS, SEARCH_TRENDING_GIFS} from "./constants";

const initialState = {
  gifs: [],
  searching: false,
  searchInfo: {},
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_TRENDING_GIFS:
    case SEARCH_GIFS: {
      return {
        ...state,
        gifs: [],
        searching: true,
        searchInfo: {},
      }
    }
    case GIFS_START_LOADING:
      return {
        ...state,
        searching: true,
      };
    case GIFS_LOADED:
      return {
        ...state,
        gifs: [
          ...state.gifs,
          ...payload.data
        ],
        searching: false,
        searchInfo: {
          text: payload.text,
          pagination: payload.pagination,
        }
      }
    default:
      return state;
  }
}
