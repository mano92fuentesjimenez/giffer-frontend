
const selectPath = (store) => store.giphyProviderReducer;
export const selectSearchText = (store) => selectPath(store).searchText;
export const selectGifData = (store) => selectPath(store).gifs;
export const selectIsSearching = (store) => selectPath(store).searching;
