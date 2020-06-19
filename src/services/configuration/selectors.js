
const selectPath = (store) => store.configReducer;
export const selectLanguage = (store) => selectPath(store).language;