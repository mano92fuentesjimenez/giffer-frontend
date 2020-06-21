import { takeEvery } from 'redux-saga/effects';
import { LOAD_MORE, SEARCH_GIFS, SEARCH_TRENDING_GIFS } from 'services/giphyProvider/constants';
import { LOCATION_CHANGE } from "connected-react-router";
import { PATH as SIGNUP_PATH } from './constants'

function* locationChange({payload: { pathname }}){
  if(pathname === SIGNUP_PATH){

  }
}

export default function* ({ api }) {
  yield takeEvery(LOCATION_CHANGE, locationChange,);
  yield takeEvery(SEARCH_TRENDING_GIFS, searchTrendingGifs, api);
  yield takeEvery(LOAD_MORE, loadMore, api );
};
