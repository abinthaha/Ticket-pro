import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setUserData } from './data/action';

import HeaderComponent from '../../common/Header';

import "./styles/styles.scss";

var jwtDecode = require("jwt-decode");

class TicketsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      var decoded = jwtDecode(token);
      this.props.setUserData(decoded);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <section className="tickets-wrapper container">
        <HeaderComponent userData={this.props.userData} />
        <h2>Tickets</h2>
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.ticketReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({setUserData}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsComponent);
