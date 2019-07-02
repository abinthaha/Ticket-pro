import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { userLogout } from "../../components/LoginComponent/data/action";
import { openSnackBar } from "../Snackbar/action";

import { setUserData } from "./action";

import "./index.scss";

var jwtDecode = require("jwt-decode");

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      isDetailsScreen: false
    };

    this.setPropsToState = this.setPropsToState.bind(this);
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
    this.setPropsToState(nextProps);
  }

  setPropsToState(props) {
    this.setState({
      ...this.state,
      userData: props.userData,
      isDetailsScreen: props.history.location.pathname === '/tickets' ? true : false
    });
  }

  logoutUser() {
    this.props.userLogout();
    this.props.openSnackBar("Logout Success");
  }


  render() {
    const { userData } = this.state;
    return (
      <div className="header-wrapper">
        {userData && userData.name ? <h2>{userData.name}</h2> : ""}
        <Link className="btn primary-btn create-ticket-btn" to={!this.state.isDetailsScreen ? '/tickets' : '/create-ticket'}>
          { !this.state.isDetailsScreen ? 'Back' : 'Create Ticket' }
        </Link>
        <button className="btn secondary-btn" onClick={() => this.logoutUser()}>
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ userLogout, openSnackBar, setUserData }, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderComponent)
);
