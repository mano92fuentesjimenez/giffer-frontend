
const selectPath = (store) => store.rootReducer;
export const selectSearchText = (store) => selectPath(store).searchText;
export const selectGifData = (store) => selectPath(store).gifs;
export const selectIsSearching = (store) => selectPath(store).searching;
