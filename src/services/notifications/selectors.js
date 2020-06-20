const selectPath = (store) => store.notificationsReducer;
export const selectIsNotificationOpen = (store) => selectPath(store).isOpen;
export const selectNotificationText = (store) => selectPath(store).text;
export const selectNotificationType = (store) => selectPath(store).type;