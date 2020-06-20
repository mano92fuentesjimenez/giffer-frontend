import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GifSearcher,{ PATH as GIF_SEARCHER_PATH } from 'scenes/GifSearcher';
import CarrouselViewer, { PATH as GIF_VIEWER_PATH } from 'scenes/GifViewer';
import './App.css';
import Notifications from 'services/notifications/components/Notifications';

function App() {
  return (
    <>
      <Notifications />
      <Switch>
        <Route exact path={GIF_SEARCHER_PATH} component={GifSearcher} />
        <Route exact path={GIF_VIEWER_PATH} component={CarrouselViewer} />
        <Route path="*" render={() => <Redirect to={GIF_SEARCHER_PATH} />} />
      </Switch>
    </>
  );
}

export default App;
