import React from 'react';
import { FormattedMessage } from 'react-intl';
import Identicon from 'components/IdentIcon/IdentIcon';
import bem from 'bem-cn';

const b = bem('components-user-btn');
const UserBtnLarge = ({ onLoginClick, onSignUpClick, onToggleShowMenu, user, showMenu, onLogoutClick, onUserSettingsClick }) => (
  <div className={b()}>
    {
      !user &&
      <>
        <div
          className={b('login')()}
          onClick={onLoginClick}
        >
          <FormattedMessage id={'login'}/>
        </div>
        |
        <div
          className={b('signup')()}
          onClick={onSignUpClick}
        >
          <FormattedMessage id={'signup'}/>
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
            <div
              className={b('menu-element')()}
              onClick={onUserSettingsClick}
            >
              <FormattedMessage id={'settings'}/>
            </div>
          </div>
        }
      </div>
    }
  </div>
)

export default UserBtnLarge;