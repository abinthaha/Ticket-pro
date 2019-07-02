import React, { Component } from "react";
import { connect } from "react-redux";

import "./index.scss";

class LoaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.isLoading ? (
      <div className="loader-wrapper">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    ) : (
      ""
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loaderReducer.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaderComponent);
