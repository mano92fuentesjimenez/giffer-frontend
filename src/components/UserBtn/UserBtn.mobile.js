import React from 'react';
import { FormattedMessage } from 'react-intl';
import settingsIcon from 'images/settings-icon.png'
import bem from 'bem-cn';
import Image from 'components/Image/Image';

const b = bem('components-user-btn');
const UserBtnMobile = ({ onLoginClick, onSignUpClick, onToggleShowMenu, user, showMenu, onLogoutClick, onUserSettingsClick }) => (
  <div className={b()}>
    <div
      className={b('user-container')()}
      onClick={onToggleShowMenu}
    >
      <Image
        className={b('settings-icon')()}
        src={settingsIcon}
        onClick={onToggleShowMenu}
      />
      {
        showMenu &&
        <div className={b('menu-container')()}>
          {
            user &&
            <>
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
            </>
          }
          {
            !user &&
            <>
              <div
                className={b('menu-element')()}
                onClick={onLoginClick}
              >
                <FormattedMessage id={'login'}/>
              </div>
              <div
                className={b('menu-element')()}
                onClick={onSignUpClick}
              >
                <FormattedMessage id={'signup'}/>
              </div>
            </>
          }
        </div>
      }
    </div>
  </div>
)

export default UserBtnMobile;