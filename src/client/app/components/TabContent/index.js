import React from "react";
import PropTypes from "prop-types";


export default class TabContent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      Component: null,
    };
  }

  async componentDidMount () {
    try {
      const content = await this.props.loader
      this.setState({ Component: content.default })
    } catch (err) {
      this.setState({ Component: null })
      throw err
    }
  }

  render () {
    const { Component } = this.state;
    if (Component) {
      return (
        <div className='tab-content--wrapper'>
          <Component { ...this.props } />
        </div>
      );
    } else {
      return <p>Unable to resolve component module</p>;
    }
  }
}

TabContent.propTypes = {
  loader: PropTypes.instanceOf(Promise).isRequired
};