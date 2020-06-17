import { call, put, delay, takeLatest } from 'redux-saga/effects'
import { SEARCH_DELAY, SEARCH_TEXT_CHANGED} from "./constants";
import { startLoadingGifs, updateGifs} from "./actions";

function* searchTextChanged({ searchGifs }, { payload: text}) {
  yield delay(SEARCH_DELAY);
  yield put(startLoadingGifs());
  const data = yield call(searchGifs, text);
  yield put(updateGifs(data));
}
export default function* ({ giphyApi }) {
  yield takeLatest(SEARCH_TEXT_CHANGED, searchTextChanged, giphyApi);
};
