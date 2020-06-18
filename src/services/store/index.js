import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import giphyApi from "../giphyProvider/giphyApi";
import locationHistoryMiddleware from "./location-history-middleware";

const configureStore = (history) => {
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose;

  const sagaMiddleware = createSagaMiddleware();
  const routingMiddleware = routerMiddleware(history);
  const enhancer = composeEnhancers(applyMiddleware(locationHistoryMiddleware, sagaMiddleware, routingMiddleware));
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
  return store;
}

export default configureStore;