import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import TicketFormComponent from './components/TicketFormComponent';
import TicketCommentComponent from './components/TicketCommentComponent';

import './styles/index.scss';

class CreateTicketComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketId: ''
        }
    }

    render() {
        return (
            <section className='container create-ticket-wrapper'>
                <TicketFormComponent ticketId={this.state.ticketId} />
                <TicketCommentComponent ticketId={this.state.ticketId} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToStore = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({}, dispatch)
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToStore)(CreateTicketComponent)
);