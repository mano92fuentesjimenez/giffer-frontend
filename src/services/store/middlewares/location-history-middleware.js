import { getLocation, LOCATION_CHANGE } from 'connected-react-router';

let cache = [];

const locationHistoryMiddleware = store => next => (action) => {
  if (action.type !== LOCATION_CHANGE) {
    next(action);
  } else {
    //bug fix, somehow in every push location, there are 2 of them.
    cache = [getLocation(store.getState()), ...cache];
    if(cache.length > 2)
      cache.pop();

    const enrichedAction = {
      ...action,
      meta: { previousLocation: cache[1] },
    };

    next(enrichedAction);
  }
};

export default locationHistoryMiddleware;
