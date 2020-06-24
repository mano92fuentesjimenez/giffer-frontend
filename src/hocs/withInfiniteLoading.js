import React from 'react';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { loadMore } from "services/giphyProvider/actions";
import { SEARCH_DELAY } from "constants/constants";
import { selectGifData, selectSearchInfo } from 'services/giphyProvider/selectors';

const withInfiniteLoading = (Component) => {
  class WithInfiniteLoading extends React.Component {

    constructor(props) {
      super(props);

      this.onScrollHandler = this.onScrollHandler.bind(this);
    }

    componentDidMount() {
      window.onscroll = debounce(this.onScrollHandler , SEARCH_DELAY);
    }

    componentWillUnmount() {
      window.onscroll = null;
    }

    onScrollHandler() {
      const {searchInfo, gifs, loadMoreAction} = this.props;
      if (
        document.documentElement.clientHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
        && searchInfo.pagination && searchInfo.pagination.total_count > gifs.length
      ) {
        loadMoreAction();
      }
    }

    render() {
      return <Component {...this.props}/>
    }

  }
  const mapStateToProps = state => ({
    searchInfo: selectSearchInfo(state),
    gifs: selectGifData(state),
  })
  const mapDispatchToProps = dispatch => ({
    loadMoreAction: () => dispatch(loadMore()),
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithInfiniteLoading);
}

export default withInfiniteLoading;
