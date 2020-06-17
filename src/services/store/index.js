import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import giphyApi from "../giphyProvider/giphyApi";

export const history = createBrowserHistory();

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ })
  : compose;

const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routingMiddleware));
const enhancedReducers = combineReducers({
  ...reducers,
  router: connectRouter(history),
});
const store = createStore(enhancedReducers, enhancer);
sagas.forEach(saga => {
  sagaMiddleware.run(saga, {
    giphyApi: giphyApi(),
  })
});

export default store;