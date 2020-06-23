import React from 'react';
import bem from 'bem-cn'
import './UserSettings.scss';
import { FormattedMessage } from 'react-intl';
import PersonalData from 'scenes/UserSettings/components/PersonalData';
import ContentRating from 'scenes/UserSettings/components/ContentRating';

const b = bem('scenes-user-settings');
const UserSettings = () => {

  return (
    <div className={b()}>
      <div className={b('title')()}><FormattedMessage id={'settings'}/> </div>
      <div className={b('settings-container')()}>
        <PersonalData/>
        <div className={b('separator')()}/>
        <div className="ml-4 flex-grow-1 d-flex">
          <ContentRating/>
        </div>
      </div>
    </div>
  )
}

export default UserSettings;