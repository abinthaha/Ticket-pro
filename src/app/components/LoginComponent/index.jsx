import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles/styles.scss";

import { getData } from "./data/action";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
      }
    };
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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

  formSubmit() {
    this.props.history.push("/tickets");
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
    ...bindActionCreators({ getData }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
