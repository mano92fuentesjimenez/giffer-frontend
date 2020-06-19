import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from "react-redux";
import { loadMore } from "services/giphyProvider/actions";
import { SEARCH_DELAY } from "constants/constants";

const withInfiniteLoading = (Component) =>
  (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      window.onscroll = debounce(() => {
        if (
          document.documentElement.clientHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight
        ) {
          dispatch(loadMore());
        }
      }, SEARCH_DELAY);
      return () => {
        window.onscroll = null;
      }
    }, [dispatch]);

    return <Component {...props}/>
  };

export default withInfiniteLoading;
