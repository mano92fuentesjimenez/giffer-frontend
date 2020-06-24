import React, { useState } from 'react';
import bem from 'bem-cn'
import './UserSettings.scss';
import { FormattedMessage } from 'react-intl';
import PersonalData from 'scenes/UserSettings/components/PersonalData';
import ContentRating from 'scenes/UserSettings/components/ContentRating';

const b = bem('scenes-user-settings');
const tabs = [
  {
    messageId: 'settings_personal_title',
    component: PersonalData,
  },
  {
    messageId: 'content_rating_settings',
    component: ContentRating,
  }
]
const UserSettings = () => {

  const [openedTab, setOpenedTab] = useState(0);

  const OpenedTabComponent = tabs[openedTab].component;
  const onTabClick = (tabPos) => () => setOpenedTab(tabPos);
  return (
    <div className={b()}>
      <div className={b('title')()}><FormattedMessage id={'settings'}/></div>
      <div className={b('tabs-container')()}>
        {tabs.map((t, index) => (
          <div
            key={index}
            className={b('tab')({ selected: openedTab === index })()}
            onClick={onTabClick(index)}
          >
            <FormattedMessage id={t.messageId}/>
          </div>
        ))}
      </div>
      <div className={b('separator')()}/>
      <div className={b('tab-container')()}>
        <OpenedTabComponent/>
      </div>
    </div>
  )
}

export default UserSettings;