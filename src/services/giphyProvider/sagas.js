import { call, put, takeLatest, takeEvery, delay, select } from 'redux-saga/effects'
import { LOAD_MORE, RESET_SEARCH, SEARCH_GIFS, SEARCH_TRENDING_GIFS, TOGGLE_FAVORITE_GIF } from './constants';
import { startLoadingGifs, stopSearch, gifsLoaded, favoriteGifToggled } from './actions';
import { selectGifData, selectIsSearching, selectSearchInfo } from './selectors';
import { showNotifications } from 'services/notifications/actions';
import { NOTIFICATION_TYPES } from 'services/notifications/constants';
import { UI_ANIMATION_DELAY } from 'constants/constants';
import selectSearch from 'services/search/selectSearch';
import { SEARCH_TYPES } from 'services/search/constants';

function* startSearching() {
  yield put(startLoadingGifs());
  // just to show searching UI
  yield delay(UI_ANIMATION_DELAY)
}

function* searchGifs({ searchGifs }, { payload: { query }}) {
  yield call(startSearching);
  try {
    const timestamp = Date.now();
    const data = yield call(searchGifs, query);

    yield put(gifsLoaded({
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

    yield put(gifsLoaded({
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

  const actualGifData = yield select(selectGifData);
  yield put(gifsLoaded({
    ...data,
    data: [
      ...data.data,
      ...actualGifData,
    ]
  }));
}

function* resetSearch({ searchTrendingGifs, searchGifs }) {
  const search = yield select(selectSearch);
  yield call(startSearching);

  if(!search.type)
    return ;

  let data;
  const timestamp = Date.now();
  console.log(search);

  try {
    switch (search.type) {
      case SEARCH_TYPES.TRENDING:
        data = yield call(searchTrendingGifs);
        break;
      case SEARCH_TYPES.SEARCH:
        data = yield call(searchGifs, search.query);
        break
      default: data = [];
    }
  } catch (e) {
    yield put(stopSearch())
    yield put(showNotifications({
      type: NOTIFICATION_TYPES.ERROR,
      textId: 'networkError',
    }))

    return;
  }

  yield put(gifsLoaded({
    ...data,
    timestamp,
  }));
}

function* togleFavoriteGif({ toggleFavoriteGif }, { payload }) {
  yield delay(UI_ANIMATION_DELAY);
  yield call(toggleFavoriteGif, payload);
  yield put(favoriteGifToggled(payload));
}

export default function* ({ api }) {
  yield takeLatest(SEARCH_GIFS, searchGifs, api);
  yield takeLatest(SEARCH_TRENDING_GIFS, searchTrendingGifs, api);
  yield takeLatest(LOAD_MORE, loadMore, api );
  yield takeLatest(RESET_SEARCH, resetSearch, api );
  yield takeEvery(TOGGLE_FAVORITE_GIF, togleFavoriteGif, api );
};
