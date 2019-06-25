import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SnackBar from '../../common/Snackbar';

import "./styles/styles.scss";

import { userLogin } from "./data/action";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarMessage: '',
      snackBarOpen: false,
      data: {
        email: "",
        password: ""
      }
    };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.loginData && nextProps.loginData !== this.props.loginData) {
      localStorage.setItem('token', nextProps.loginData.token);
      this.setState({
        ...this.state,
        snackBarMessage: 'Login Success',
        snackBarOpen: true,
      })
    }
  }

  handleCloseSnackbar() {
    this.setState({
      ...this.state,
      snackBarMessage: '',
      snackBarOpen: false,
    }, () => {
      this.props.history.push("/tickets");
    })
  }

  inputChange(ev, type) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [type]: ev.target.value
      }
    });
  }

  formSubmit(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const { email, password } = this.state.data;
    const data = {
      email,
	    password
    }
    this.props.userLogin(data);
  }

  render() {
    return (
      <section className="login-wrapper">
        <div className="login-container">
          <form onSubmit={ev => this.formSubmit(ev)}>
            <div className="login-row logo-wrapper">
              <span className="logo-container" />
            </div>
            <div className="login-row">
              <input
                type="email"
                className="text-input"
                value={this.state.data.email}
                onChange={ev => this.inputChange(ev, "email")}
                required
                placeholder="Email"
              />
            </div>
            <div className="login-row">
              <input
                type="password"
                className="text-input"
                value={this.state.data.password}
                onChange={ev => this.inputChange(ev, "password")}
                required
                placeholder="Password"
              />
            </div>
            <div className="login-row">
              <input type="submit" className="submit-button btn primary-btn" value="Login" />
              <input type="button" className="sign-up-btn btn secondary-btn" value="Signup" />
            </div>
          </form>
        </div>
        <SnackBar
          open={this.state.snackBarOpen}
          message={this.state.snackBarMessage}
          handleCloseSnackbar={this.handleCloseSnackbar}
        />
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    loginData: state.loginReducer.loginData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ userLogin }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
