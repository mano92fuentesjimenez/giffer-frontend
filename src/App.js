import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GifSearcher,{ PATH as GIFS_PATH } from 'scenes/GifSearcher';
import LogIn ,{ PATH as LOGIN_PATH } from 'scenes/LogIn';
import SignUp ,{ PATH as SIGNUP_PATH } from 'scenes/SignUp';
import CarouselViewer, { PATH as GIFS_VIEW_PATH } from 'scenes/GifViewer';
import UserSettings, { PATH as USER_SETTINGS_PATH } from 'scenes/UserSettings';
import Notifications from 'services/notifications/components/Notifications';
import ModalService from 'services/modal-service/ModalService';
import { useSelector } from 'react-redux';
import { selectAppLoaded } from 'services/configuration/selectors';
import Loader from 'react-loader-spinner';
import bem from 'bem-cn'
import withAuthenticatedRedirection from 'hocs/withAuthenticatedRedirection';
import './App.scss';

const b = bem('app-root');

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
              <Route exact path={LOGIN_PATH} component={withAuthenticatedRedirection(false)(LogIn)}/>
              <Route exact path={SIGNUP_PATH} component={withAuthenticatedRedirection(false)(SignUp)}/>
              <Route exact path={USER_SETTINGS_PATH} component={withAuthenticatedRedirection(true)(UserSettings)}/>
            </Switch>
          </ModalService>
          <Switch>
            <Route path={GIFS_PATH} component={GifSearcher}/>
            <Route path="*" render={() => <Redirect to={GIFS_PATH}/>}/>
          </Switch>
        </>
      }
      {
        !appLoaded &&
        <div className={b('loader-container')()}>
          <Loader type="Rings" color='blue' height={400} width={400}/>
        </div>
      }
    </>
  );
}

export default App;
