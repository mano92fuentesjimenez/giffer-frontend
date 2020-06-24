import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'services/user/selectors';
import { goToGifs } from 'scenes/GifSearcher/actions';

const checkAuth = (checkIsAuthenticated, user) => (checkIsAuthenticated && !user) || (!checkIsAuthenticated && user );

const withAuthenticatedRedirection = checkIsAuthenticated => Component => (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //hack to not throw in some hooks
  useLayoutEffect(() => {
    if(checkAuth(checkIsAuthenticated, user))
      dispatch(goToGifs())
    // eslint-disable-next-line
  }, [])
  if(checkAuth(checkIsAuthenticated, user))
    return null;


  return <Component {...props}/>
}

export default withAuthenticatedRedirection;