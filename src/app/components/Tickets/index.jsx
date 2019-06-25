import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles/styles.scss";

class TicketsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  createTicket() {
    this.props.history.push('/create-ticket');
  }

  render() {
    return (
      <section className="tickets-wrapper container">
        <div>Tickets</div>
        <button className='btn primary-btn' onClick={ev => this.createTicket()}>Add new</button>
      </section>
    );
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
