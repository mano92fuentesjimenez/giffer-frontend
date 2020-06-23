import React from 'react';
import bem from 'bem-cn'
import './UserSettings.scss';
import { FormattedMessage } from 'react-intl';
import PersonalData from 'scenes/UserSettings/components/PersonalData';

const b = bem('scenes-user-settings');
const UserSettings = () => {

  return (
    <div className={b()}>
      <div className={b('title')()}><FormattedMessage id={'settings'}/> </div>
      <PersonalData/>
    </div>
  )
}

export default UserSettings;