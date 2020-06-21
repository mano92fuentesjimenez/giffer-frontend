
const selectPath = (store) => store.configReducer;
export const selectLanguage = (store) => selectPath(store).language;
export const selectAppLoaded = (store) => selectPath(store).loaded;
export const selectPublicKey = (store) => selectPath(store).publicKey;