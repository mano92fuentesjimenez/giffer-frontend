import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GiphySearcher,{ PATH as GIF_SEARCHER_PATH } from "scenes/GiphySearcher";
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path={GIF_SEARCHER_PATH} component={GiphySearcher} />
      <Route path="*" render={() => <Redirect to={GIF_SEARCHER_PATH} />} />
    </Switch>
  );
}

export default App;
