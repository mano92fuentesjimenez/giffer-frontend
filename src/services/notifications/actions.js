import { CLOSE_NOTIFICATIONS, NOTIFICATIONS_OPENED, OPEN_NOTIFICATIONS } from 'services/notifications/constants';

export const showNotifications = ({ type, textId }) => ({ type: OPEN_NOTIFICATIONS, payload: { type, textId } });
export const notificationsOpened = ({ type, textId }) => ({ type: NOTIFICATIONS_OPENED, payload: { type, textId } });
export const closeNotifications = () => ({ type: CLOSE_NOTIFICATIONS });