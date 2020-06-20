import React from 'react';
import bem from 'bem-cn';
import './Notifications.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsNotificationOpen,
  selectNotificationText,
  selectNotificationType
} from 'services/notifications/selectors';
import { FormattedMessage } from 'react-intl';
import CloseBtn from 'components/CloseBtn/CloseBtn';
import { closeNotifications } from 'services/notifications/actions';

const icons = {
  info: require('images/info.png'),
  error: require('images/error.png'),
}

const b = bem('services-notification');

const Notifications = () => {

  const dispatch = useDispatch();
  const text = useSelector(selectNotificationText);
  const type = useSelector(selectNotificationType);
  const isOpen = useSelector(selectIsNotificationOpen);

  const onClose = () => dispatch(closeNotifications());

  return (
    <div className={b({ isOpen })()}>
      <div className={b('top-bar')({ type })()}>
        {
          type &&
            <>
              <img className={b('icon')()} src={icons[type]} alt={type}/>
              <span><FormattedMessage id={type} /></span>
              <CloseBtn onClick={onClose} className={b('close-btn')()} />
            </>
        }
      </div>
      <div className={b('content')()}>{text}</div>
    </div>
  )

}

export default Notifications;