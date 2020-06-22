import React, { useEffect, useRef, useState } from 'react';
import bem from 'bem-cn'
import Identicon from 'components/IdentIcon/IdentIcon';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectUser } from 'services/user/selectors';
import { PATH as LOGIN_PATH} from 'scenes/LogIn';
import { PATH as SIGNUP_PATH} from 'scenes/SignUp';
import { FormattedMessage } from 'react-intl';
import selectSearch from 'services/search/selectSearch';
import { getStringFromSearch } from 'services/search/helpers';
import './UserBtn.scss';
import { logOut } from 'services/user/actions';

const b = bem('components-user-btn');
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
  })

  const onLoginClick = () => dispatch(push({ pathname: LOGIN_PATH, search: getStringFromSearch(search) }));
  const onSignUpClick = () => dispatch(push({ pathname: SIGNUP_PATH, search: getStringFromSearch(search) }));
  const onLogoutClick = () => {
    setShowMenu(false);
    dispatch(logOut());
  }
  const onToggleShowMenu = () => setShowMenu(!showMenu);

  return <div className={b()} ref={containerRef}>
    {
      !user &&
      <>
        <div
          className={b('login')()}
          onClick={onLoginClick}
        >
          <FormattedMessage id={'login'} />
        </div>
        |
        <div
          className={b('signup')()}
          onClick={onSignUpClick}
        >
          <FormattedMessage id={'signup'} />
        </div>
      </>
    }
    {
      user &&
      <div
        className={b('user-container')()}
        onClick={onToggleShowMenu}
      >
        <div className={b('user-info')()}>
          <span className={b('user-name')()}>
            {user.name}
          </span>
          <Identicon value={user.email}/>
        </div>
        {
          showMenu &&
          <div className={b('menu-container')()}>
            <div
              className={b('menu-element')()}
              onClick={onLogoutClick}
            >
              <FormattedMessage id={'log_out'}/>
            </div>
          </div>
        }
      </div>
    }
  </div>;
}

export default UserBtn;