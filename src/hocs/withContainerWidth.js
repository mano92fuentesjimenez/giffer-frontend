import React from 'react';

const withContainerWidth = Component =>
  class ContainerWidth extends React.Component{
    state = { currentRef: null };

    constructor() {
      super();

      this.handleRefChange = this.handleRefChange.bind(this);
      this.handleResize = this.handleResize.bind(this);
    }

    handleRefChange(ref) {
      this.setState({ currentRef: ref });
    }
    handleResize() {
      this.forceUpdate();
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    getWidth() {
      const { currentRef } = this.state;
      if(currentRef)
        return currentRef.getBoundingClientRect().width;
      return 0;
    }

    render() {
      return (
        <div ref={this.handleRefChange}>
          <Component width={this.getWidth()} {...this.props}/>
        </div>
      );
    }
  }

export default withContainerWidth;