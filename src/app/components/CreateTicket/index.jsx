import React, { Component } from 'react';
import TicketFormComponent from './components/TicketFormComponent';
import TicketCommentComponent from './components/TicketCommentComponent';

class CreateTicketComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <section className='container create-ticket-wrapper'>
                <TicketFormComponent />
                <TicketCommentComponent />
            </section>
        )
    }
}

export default CreateTicketComponent;