import { takeLatest, select, delay, put } from "redux-saga/effects";
import { getLocation, LOCATION_CHANGE, push } from 'connected-react-router';
import { PATH as GIF_SEARCHER_PATH } from './constants'
import selectSearch from "services/search/selectSearch";
import { searchGifs, searchTrendingGifs } from "services/giphyProvider/actions";
import { getStringFromSearch } from "services/search/helpers";
import { wasTypeTrendingLastPath } from "helpers/routesHelper";
import { SEARCH_DELAY } from "constants/constants";

function* locationChanged(action) {
  yield delay(SEARCH_DELAY);
  const currentPath = yield select(getLocation);

  if(currentPath.pathname !== GIF_SEARCHER_PATH)
    return;

  const search = yield select(selectSearch);
  if(search.query) yield put(searchGifs(search));
  else if(!wasTypeTrendingLastPath(action)) {
    yield put(searchTrendingGifs());
    yield put(push({ pathname: GIF_SEARCHER_PATH, search: getStringFromSearch({ ...search, type: 'trending' })}));
  }
}

export default function* () {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
};
