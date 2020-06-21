import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GifSearcher,{ PATH as GIFS_PATH } from 'scenes/GifSearcher';
import LogIn ,{ PATH as LOGIN_PATH } from 'scenes/LogIn';
import SignUp ,{ PATH as SIGNUP_PATH } from 'scenes/SignUp';
import CarouselViewer, { PATH as GIFS_VIEW_PATH } from 'scenes/GifViewer';
import Notifications from 'services/notifications/components/Notifications';
import ModalService from 'services/modal-service/ModalService';
import { useSelector } from 'react-redux';
import { selectAppLoaded } from 'services/configuration/selectors';
import Loader from 'react-loader-spinner';
import './App.css';

function App() {
  const appLoaded = useSelector(selectAppLoaded);

  return (
    <>
      {
        appLoaded &&
        <>
          <Notifications/>
          <ModalService>
            <Switch>
              <Route exact path={GIFS_VIEW_PATH} component={CarouselViewer}/>
              <Route exact path={LOGIN_PATH} component={LogIn}/>
              <Route exact path={SIGNUP_PATH} component={SignUp}/>
            </Switch>
          </ModalService>
          <Switch>
            <Route path={GIFS_PATH} component={GifSearcher}/>
            <Route path="*" render={() => <Redirect to={GIFS_PATH}/>}/>
          </Switch>
        </>
      }
      { !appLoaded && <Loader type="Rings" color='blue' height={400} width={400}/>}

    </>
  );
}

export default App;
