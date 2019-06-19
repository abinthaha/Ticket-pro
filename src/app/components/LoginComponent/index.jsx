import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getData } from "./data/action";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  async handleClick() {
    this.props.getData();
  }

  render() {
    const tableBody = this.props.loginData && this.props.loginData.map((userData, index) => {
      return (
        <tr key={index}>
          <td>{userData.name}</td>
        </tr>
      )
    })
    return (
      <div>
        <button onClick={ev => this.handleClick(ev)}>Click</button>
        <table>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
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
