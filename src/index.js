import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import { SearchProvider } from 'services/search/context';
import { createBrowserHistory } from "history";
import { configureStore } from 'services/store';
import ReactModal from 'react-modal';
import IntlProvider from 'services/intl/IntlProvider';
import { loadApp } from 'services/configuration/actions';

const history = createBrowserHistory();
const store = configureStore(history);

ReactModal.setAppElement('#root');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <SearchProvider>
            <IntlProvider>
              <App />
            </IntlProvider>
          </SearchProvider>
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  store.dispatch(loadApp());
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
