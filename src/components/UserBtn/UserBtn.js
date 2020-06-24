import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectUser } from 'services/user/selectors';
import { PATH as LOGIN_PATH} from 'scenes/LogIn';
import { PATH as SIGNUP_PATH} from 'scenes/SignUp';
import { PATH as USER_SETTINGS_PATH } from 'scenes/UserSettings/constants';
import selectSearch from 'services/search/selectSearch';
import { getStringFromSearch } from 'services/search/helpers';
import { logOut } from 'services/user/actions';
import Responsive from 'services/Responsive';
import UserBtnLarge from 'components/UserBtn/UserBtn.large';
import UserBtnMobile from 'components/UserBtn/UserBtn.mobile';
import './UserBtn.scss';

const ResponsiveComponent = Responsive({
  Mobile: UserBtnMobile,
  MidDesktop: UserBtnLarge,
  LargeDesktop: UserBtnLarge,
})

const UserBtn = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const search = useSelector(selectSearch);

  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null)

  const onWindowClick = (e) => {
    if(containerRef.current && !containerRef.current.contains(e.target))
      setShowMenu(false);
  }

  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, [])

  const onLoginClick = () => dispatch(push({ pathname: LOGIN_PATH, search: getStringFromSearch(search) }));
  const onSignUpClick = () => dispatch(push({ pathname: SIGNUP_PATH, search: getStringFromSearch(search) }));
  const onLogoutClick = () => dispatch(logOut())
  const onUserSettingsClick = () => dispatch(push({ pathname: USER_SETTINGS_PATH, search: getStringFromSearch(search) }));
  const onToggleShowMenu = () => setShowMenu(!showMenu);

  const props = {
    onLoginClick,
    onSignUpClick,
    onToggleShowMenu,
    user,
    showMenu,
    onLogoutClick,
    onUserSettingsClick,
  }

  return (
    <div ref={containerRef}>
      <ResponsiveComponent {...props}/>
    </div>
  )
}

export default UserBtn;