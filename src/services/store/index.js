import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import giphyApi from "../giphyProvider/giphyApi";

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ })
  : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const enhancedReducers = combineReducers({
  ...reducers,
});
const store = createStore(enhancedReducers, enhancer);
sagas.forEach(saga => {
  sagaMiddleware.run(saga, {
    giphyApi: giphyApi(),
  })
});

export default store;