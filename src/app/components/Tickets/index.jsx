import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles/styles.scss";

class TicketsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return <section className="tickets-wrapper">Tickets</section>;
  }
}

const mapStateToProps = function(state) {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsComponent);
