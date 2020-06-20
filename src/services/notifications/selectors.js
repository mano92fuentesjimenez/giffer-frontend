const selectPath = (store) => store.notificationsReducer;
export const selectIsNotificationOpen = (store) => selectPath(store).isOpen;
export const selectNotificationTextId = (store) => selectPath(store).textId;
export const selectNotificationType = (store) => selectPath(store).type;