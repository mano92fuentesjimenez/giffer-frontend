import { CLOSE_NOTIFICATIONS, OPEN_NOTIFICATIONS } from 'services/notifications/constants';

export const showNotifications = ({ type, textId }) => ({ type: OPEN_NOTIFICATIONS, payload: { type, textId } });
export const closeNotifications = () => ({ type: CLOSE_NOTIFICATIONS });