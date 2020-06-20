import { CLOSE_NOTIFICATIONS, OPEN_NOTIFICATIONS } from 'services/notifications/constants';

export const openNotifications = ({ type, text }) => ({ type: OPEN_NOTIFICATIONS, payload: { type, text } });
export const closeNotifications = () => ({ type: CLOSE_NOTIFICATIONS });