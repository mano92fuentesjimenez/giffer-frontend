import { getLocation, LOCATION_CHANGE } from 'connected-react-router';

const locationHistoryMiddleware = store => next => (action) => {
  if (action.type !== LOCATION_CHANGE) {
    next(action);
  } else {
    const enrichedAction = {
      ...action,
      meta: { previousLocation: getLocation(store.getState()) },
    };

    next(enrichedAction);
  }
};

export default locationHistoryMiddleware;
