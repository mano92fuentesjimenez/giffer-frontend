import React from 'react';
import { useMediaQuery } from 'react-responsive'

export const RESPONSIVE_QUERY = '(max-width: 992px)';

/* This is assuming only two breakpoints. It can become more sophisticated */
export default ({ Mobile, MidDesktop, LargeDesktop }) => props => {
  const isMobile = useMediaQuery({ query: '(max-width: 780px)'});
  const isMidScreen = useMediaQuery({ query: '(min-width: 780px ) and (max-width: 1120px)'});
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1120px)' });

  if(isMobile) return <Mobile {...props}/>;
  if(isMidScreen) return <MidDesktop {...props}/>;
  if(isLargeScreen) return <LargeDesktop {...props}/>

  return <Mobile {...props}/>
};
