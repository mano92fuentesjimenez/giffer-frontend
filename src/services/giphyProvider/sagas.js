import { call, put, takeEvery, delay, select } from 'redux-saga/effects'
import { LOAD_MORE, SEARCH_GIFS, SEARCH_TRENDING_GIFS, SEARCHING_DELAY } from './constants';
import { startLoadingGifs, stopSearch, updateGifs } from './actions';
import {selectIsSearching, selectSearchInfo} from './selectors';
import { showNotifications } from 'services/notifications/actions';
import { NOTIFICATION_TYPES } from 'services/notifications/constants';

function* startSearching() {
  yield put(startLoadingGifs());
  // just to show searching UI
  yield delay(SEARCHING_DELAY)
}

function* searchGifs({ searchGifs }, { payload: { query }}) {
  yield call(startSearching);
  try {
    const timestamp = Date.now();
    const data = yield call(searchGifs, query);

    yield put(updateGifs({
      ...data,
      timestamp,
    }));
  } catch (e) {
    yield put(stopSearch())
    yield put(showNotifications({
      type: NOTIFICATION_TYPES.ERROR,
      textId: 'networkError',
    }))
  }
}

function* searchTrendingGifs({ searchTrendingGifs }) {
  yield call(startSearching);
  try {
    const timestamp = Date.now();
    const data = yield call(searchTrendingGifs);

    yield put(updateGifs({
      ...data,
      timestamp,
    }));
  } catch (e) {
    yield put(stopSearch())
    yield put(showNotifications({
      type: NOTIFICATION_TYPES.ERROR,
      textId: 'networkError',
    }))
  }
}

function* loadMore({ searchTrendingGifs, searchGifs }) {

  const isSearching = yield select(selectIsSearching);
  if(isSearching) return;

  yield call(startSearching);
  const { query, pagination } = yield select(selectSearchInfo);

  let data;
  if (query) data = yield call(searchGifs, query, pagination.offset + pagination.count);
  else data = yield call(searchTrendingGifs,pagination.offset + pagination.count);

  yield put(updateGifs(data));
}

export default function* ({ giphyApi }) {
  yield takeEvery(SEARCH_GIFS, searchGifs, giphyApi);
  yield takeEvery(SEARCH_TRENDING_GIFS, searchTrendingGifs, giphyApi);
  yield takeEvery(LOAD_MORE, loadMore, giphyApi );
};
