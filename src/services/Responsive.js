import React from 'react';
import { useMediaQuery } from 'react-responsive'

export const mobileMediaQuery = { query: '(max-width: 780px)'};
export const midScreenMediaQuery = { query: '(min-width: 780px ) and (max-width: 1120px)'};
export const largeScreeMediaQUery = { query: '(min-width: 1120px)' };

/* This is assuming only two breakpoints. It can become more sophisticated */
export default ({ Mobile, MidDesktop, LargeDesktop }) => props => {
  const isMobile = useMediaQuery(mobileMediaQuery);
  const isMidScreen = useMediaQuery(midScreenMediaQuery);
  const isLargeScreen = useMediaQuery(largeScreeMediaQUery);

  if(isMobile) return <Mobile {...props}/>;
  if(isMidScreen) return <MidDesktop {...props}/>;
  if(isLargeScreen) return <LargeDesktop {...props}/>

  return <Mobile {...props}/>
};
