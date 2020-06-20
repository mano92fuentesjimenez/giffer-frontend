const selectPath = (store) => store.userReducer;
export const selectUser = (store) => selectPath(store).user;