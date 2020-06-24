import { takeLatest, select, delay, put } from 'redux-saga/effects';
import { getLocation, LOCATION_CHANGE, push } from 'connected-react-router';
import { GO_TO_GIFS, GO_TO_TRENDINGS, PATH as GIFS_PATH } from './constants'
import selectSearch from 'services/search/selectSearch';
import { searchFavoriteGifs, searchGifs, searchTrendingGifs } from 'services/giphyProvider/actions';
import { getStringFromSearch } from 'services/search/helpers';
import { SEARCH_DELAY } from 'constants/constants';
import { selectIsSearching, selectSearchInfo } from 'services/giphyProvider/selectors';
import { wasLastRouteTheSame, wasTypeTrendingLastPath } from 'helpers/routesHelper';
import { SEARCH_TYPES } from 'services/search/constants';
import { selectUser } from 'services/user/selectors';
import { goToTrendings as goToTrendingsAction } from './actions';

function* goToTrendings() {
  const search = yield select(selectSearch);
  yield put(push({ pathname: GIFS_PATH, search: getStringFromSearch({ ...search, type: 'trending' })}));
}

function* locationChanged(action) {
  yield delay(SEARCH_DELAY);
  const currentPath = yield select(getLocation);

  if(currentPath.pathname !== GIFS_PATH)
    return;
  const search = yield select(selectSearch);
  const isLoading = yield select(selectIsSearching)
  const lastSearchInfo = yield select(selectSearchInfo);
  const user = yield select(selectUser);

  if(!user && search.type === SEARCH_TYPES.FAVORITES){
    return yield put(goToTrendingsAction());
  }

  if(
  !wasLastRouteTheSame(action, GIFS_PATH)
    // eslint-disable-next-line
    && lastSearchInfo.pagination
  )
    return;
  if(search.query) yield put(searchGifs(search));
  else if(search.type === SEARCH_TYPES.FAVORITES) {
    yield put(searchFavoriteGifs());
  }
  else if((!wasTypeTrendingLastPath(action) || !isLoading)) {
    yield put(searchTrendingGifs());
    yield put(goToTrendingsAction());
  }
}

function* goToGifs() {
  const search = yield select(selectSearch);
  yield put(push({ pathname: GIFS_PATH, search: getStringFromSearch(search)}))
}

export default function* () {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
  yield takeLatest(GO_TO_GIFS, goToGifs);
  yield takeLatest(GO_TO_TRENDINGS, goToTrendings);
};
