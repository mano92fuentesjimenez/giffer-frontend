const selectPath = (store) => store.userReducer;
export const selectUser = (store) => selectPath(store).user;
export const selectAuthorizationError = (store) => selectPath(store).authorizationError;