import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GifSearcher,{ PATH as GIFS_PATH } from 'scenes/GifSearcher';
import CarrouselViewer, { PATH as GIFS_VIEW_PATH } from 'scenes/GifViewer';
import './App.css';
import Notifications from 'services/notifications/components/Notifications';

function App() {
  return (
    <>
      <Notifications />
      <Switch>
        <Route exact path={GIFS_PATH} component={GifSearcher} />
        <Route exact path={GIFS_VIEW_PATH} component={CarrouselViewer} />
        <Route path="*" render={() => <Redirect to={GIFS_PATH} />} />
      </Switch>
    </>
  );
}

export default App;
