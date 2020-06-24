
const selectPath = (store) => store.giphyProviderReducer;
export const selectGifData = (store) => selectPath(store).gifs;
export const selectIsSearching = (store) => selectPath(store).searching;
export const selectSearchInfo = (store) => selectPath(store).searchInfo;
export const selectGifToggingFavorite = (store) => selectPath(store).togglingFavoriteGif;
