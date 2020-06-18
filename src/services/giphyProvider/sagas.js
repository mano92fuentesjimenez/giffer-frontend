import { call, put, takeEvery, delay } from 'redux-saga/effects'
import { SEARCH_GIFS, SEARCHING_DELAY } from "./constants";
import { startLoadingGifs, updateGifs} from "./actions";

function* searchGifs({ searchGifs }, { payload: { query }}) {
  // just to show searching UI
  yield delay(SEARCHING_DELAY)
  yield put(startLoadingGifs());
  const data = yield call(searchGifs, query);
  yield put(updateGifs(data));
}
export default function* ({ giphyApi }) {
  yield takeEvery(SEARCH_GIFS, searchGifs, giphyApi);
};
