import { call, put, takeEvery, delay } from 'redux-saga/effects'
import {SEARCH_GIFS, SEARCH_TRENDING_GIFS, SEARCHING_DELAY} from "./constants";
import { startLoadingGifs, updateGifs} from "./actions";

function* startSearching() {
  // just to show searching UI
  yield delay(SEARCHING_DELAY)
  yield put(startLoadingGifs());
}

function* searchGifs({ searchGifs }, { payload: { query }}) {
  yield call(startSearching);
  const data = yield call(searchGifs, query);
  yield put(updateGifs(data));
}

function* searchTrendingGifs({ searchTrendingGifs }) {
  yield call(startSearching);
  const data = yield call(searchTrendingGifs);
  yield put(updateGifs(data));
}

export default function* ({ giphyApi }) {
  yield takeEvery(SEARCH_GIFS, searchGifs, giphyApi);
  yield takeEvery(SEARCH_TRENDING_GIFS, searchTrendingGifs, giphyApi);
};
