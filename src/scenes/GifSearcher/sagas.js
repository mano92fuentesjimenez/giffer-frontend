import { takeLatest, select, delay, put } from "redux-saga/effects";
import { getLocation, LOCATION_CHANGE } from 'connected-react-router';
import { PATH as GIF_SEARCHER_PATH, SEARCH_DELAY } from './constants'
import selectSearch from "services/search/selectSearch";
import { searchGifs } from "services/giphyProvider/actions";

function* locationChanged() {
  yield delay(SEARCH_DELAY);
  const currentPath = yield select(getLocation);

  if(currentPath.pathname !== GIF_SEARCHER_PATH)
    return;

  const search = yield select(selectSearch);
  yield put(searchGifs(search));
}

export default function* () {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
};
