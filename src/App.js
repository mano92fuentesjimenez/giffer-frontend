import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GifSearcher,{ PATH as GIFS_PATH } from 'scenes/GifSearcher';
import CarrouselViewer, { PATH as GIFS_VIEW_PATH } from 'scenes/GifViewer';
import Notifications from 'services/notifications/components/Notifications';
import ModalService from 'services/modal-service/ModalService';
import './App.css';

function App() {
  return (
    <>
      <Notifications />
      <ModalService>
        <Switch>
          <Route exact path={GIFS_VIEW_PATH} component={CarrouselViewer} />
        </Switch>
      </ModalService>
      <Switch>
        <Route path={GIFS_PATH} component={GifSearcher} />
        <Route path="*" render={() => <Redirect to={GIFS_PATH} />} />
      </Switch>
    </>
  );
}

export default App;
