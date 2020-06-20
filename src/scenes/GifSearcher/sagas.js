import { takeLatest, select, delay, put } from 'redux-saga/effects';
import { getLocation, LOCATION_CHANGE, push } from 'connected-react-router';
import { PATH as GIFS_PATH } from './constants'
import selectSearch from 'services/search/selectSearch';
import { searchGifs, searchTrendingGifs } from 'services/giphyProvider/actions';
import { getStringFromSearch } from 'services/search/helpers';
import { SEARCH_DELAY } from 'constants/constants';
import { selectIsSearching, selectSearchInfo } from 'services/giphyProvider/selectors';
import { wasLastRouteTheSame, wasTypeTrendingLastPath } from 'helpers/routesHelper';

function* locationChanged(action) {
  yield delay(SEARCH_DELAY);
  const currentPath = yield select(getLocation);

  if(currentPath.pathname !== GIFS_PATH)
    return;

  const search = yield select(selectSearch);
  const isLoading = yield select(selectIsSearching)
  const lastSearchInfo = yield select(selectSearchInfo);

  if(
  !wasLastRouteTheSame(action, GIFS_PATH)
    // eslint-disable-next-line
    && lastSearchInfo.query == search.query
    && lastSearchInfo.pagination
  )
    return;
  if(search.query) yield put(searchGifs(search));
  else if(!wasTypeTrendingLastPath(action) || !isLoading) {
    yield put(searchTrendingGifs());
    yield put(push({ pathname: GIFS_PATH, search: getStringFromSearch({ ...search, type: 'trending' })}));
  }
}

export default function* () {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
};
