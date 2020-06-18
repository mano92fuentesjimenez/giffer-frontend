import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GifSearcher,{ PATH as GIF_SEARCHER_PATH } from "scenes/GifSearcher";
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path={GIF_SEARCHER_PATH} component={GifSearcher} />
      <Route path="*" render={() => <Redirect to={GIF_SEARCHER_PATH} />} />
    </Switch>
  );
}

export default App;
