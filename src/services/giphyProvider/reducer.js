import {
  FAVORITE_GIF_TOGGLED,
  GIFS_LOADED,
  GIFS_START_LOADING,
  RESET_SEARCH,
  SEARCH_GIFS,
  SEARCH_TRENDING_GIFS, TOGGLE_FAVORITE_GIF,
  STOP_SEARCH
} from './constants';

const initialState = {
  gifs: [],
  searching: false,
  searchInfo: {},
  togglingFavoriteGif: [],
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case RESET_SEARCH:
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
      if(payload.timestamp && state.searchInfo.timestamp > payload.timestamp)
        return state;
      return {
        ...state,
        gifs: [
          ...payload.data
        ],
        searching: false,
        searchInfo: {
          query: payload.text,
          pagination: payload.pagination,
          timestamp: payload.timestamp,
        }
      }
    case STOP_SEARCH:
      return {
        ...state,
        gifs: [],
        searching: false,
        searchInfo: {},
      };
    case TOGGLE_FAVORITE_GIF:
      return {
        ...state,
        togglingFavoriteGif: [
          ...state.togglingFavoriteGif,
          payload,
        ]
      };
    case FAVORITE_GIF_TOGGLED:
      return {
        ...state,
        gifs: state.gifs.map( gif => {
          if(gif.id === payload)
            return {
              ...gif,
              isFavorite: !gif.isFavorite,
            }
          return gif;
        }),
        togglingFavoriteGif: state.togglingFavoriteGif.filter(
          favoriteGif => favoriteGif !== payload
        ),
      }
    default:
      return state;
  }
}
