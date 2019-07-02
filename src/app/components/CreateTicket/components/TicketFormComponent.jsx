import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { fetchTicket, createTicket, createComment, updateTicket, fetchComments, fetchAdminUsers } from '../data/action';
import { openSnackBar } from '../../../common/Snackbar/action';

import '../styles/create-ticket.scss';

class TicketFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketId: '',
            isUserActive: false,
            isEdit: false,
            data: {
                title: '',
                description: '',
                comment: '',
                type: '1',
                assigned_to: '',
                status: '1'
            }
        }

        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
        this.getTicketId = this.getTicketId.bind(this);
    }

    componentDidMount() {
        this.getTicketId(this.props);
        this.props.fetchAdminUsers();
    }

    componentWillReceiveProps(nextProps) {
        this.getTicketId(nextProps);
        if (nextProps.ticketDetails && this.props.ticketDetails !== nextProps.ticketDetails) {
            this.setState({
                ...this.state,
                data: {
                    ...this.state.data,
                    title: nextProps.ticketDetails.title,
                    description: nextProps.ticketDetails.description,
                    comment: '',
                    type: nextProps.ticketDetails.type === 1 ? '1' : '2',
                    status: nextProps.ticketDetails.status === 1 ? '1' : (nextProps.ticketDetails.status === 2 ? '2' : '3'),
                    assigned_to: nextProps.ticketDetails.assigned_to
                }
            })
        }
        if (nextProps.createTicketData && nextProps.createTicketData !== this.props.createTicketData) {
            this.props.openSnackBar('Ticket created successfully with Ticket ID: ' + nextProps.createTicketData.ticket_id);
            this.createComment(nextProps.createTicketData.ticket_id, 'Ticket created');
            
        } else if (nextProps.createCommentData && this.props.createCommentData !== nextProps.createCommentData) {
            if (!this.state.isEdit) {
                this.props.history.push('/tickets');
            } else {
                this.props.openSnackBar('Ticket updated successfully');
                this.props.fetchComments(this.state.ticketId);
                this.props.fetchTicket(this.state.ticketId);
            }
        }
    }

    createComment(ticket_id, comment) {
        const data = {
            "ticket_id": ticket_id,
            "comment": comment,
            "created_by": this.props.userData.email
        }
        this.props.createComment(data);
    }

    getTicketId = (props) => {
        if (!this.state.ticketId) {
            const { location } = props.history;
            const ticketId = location.search.split('=')[1];
            if (ticketId) {
                this.setState({
                    ...this.state,
                    ticketId,
                    isEdit: true
                }, () => {
                    this.props.fetchTicket(ticketId);
                })
            }
        }
    }

    onChange(type, event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [type]: event.target.value
            }
        })
    }

    submitForm(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.state.isEdit) {
            const data = {
                "ticket_id": this.state.ticketId,
                "status": this.state.data.status,
                "assigned_to": this.state.data.assigned_to
            }
            this.props.updateTicket(data);
            const updateComment = this.state.data.comment ? this.state.data.comment : 'Ticket updated'
            this.createComment(this.state.ticketId, updateComment);
        } else {
            const data = {
                "title": this.state.data.title,
                "description": this.state.data.description,
                "type": parseInt(this.state.data.type, 10),
                "created_by": this.props.userData.email
            }
            this.props.createTicket(data);
        }
    }

    cancelCreate() {
        this.props.history.push("/tickets");
    }

    onUserClick(user) {
        this.setState({
            ...this.state,
            isUserActive: false,
            data: {
                ...this.state.data,
                assigned_to: user.email
            }
        })
    }

    showUserList(flag) {
        this.setState({
            ...this.state,
            isUserActive: flag
        })
    }
 
    render() {

        const { data } = this.state;

        return (
            <section className='create-form-container'>
                <form onSubmit={ev => this.submitForm(ev)} className='create-form-wrapper'>
                    <div className='create-ticket-item'>
                        <label>Title</label>
                        <input
                            type="text"
                            name=""
                            value={data.title}
                            disabled={this.state.isEdit}
                            id=""
                            onChange={ev => this.onChange('title', ev)}
                        />
                    </div>
                    <div className='create-ticket-item'>
                        <label>Description</label>
                        <textarea
                            name=""
                            id=""
                            value={data.description}
                            disabled={this.state.isEdit}
                            onChange={ev => this.onChange('description', ev)}
                        ></textarea>
                    </div>
                    <div className='create-ticket-item'>
                        <label>Type</label>
                        <select
                            name=""
                            id=""
                            value={data.type}
                            disabled={this.state.isEdit}
                            onChange={ev => this.onChange('type', ev)}
                        >
                            <option value="1">Service</option>
                            <option value="2">Bug</option>
                        </select>
                    </div>
                    {
                        this.state.isEdit ?
                        (
                            <div className='create-ticket-item'>
                                <label>Status</label>
                                <select
                                    name=""
                                    id=""
                                    disabled={this.props.ticketDetails.status === 3}
                                    value={data.status}
                                    onChange={ev => this.onChange('status', ev)}
                                >
                                    <option value="1">Not Started</option>
                                    <option value="2">In Progress</option>
                                    <option value="3">Closed</option>
                                </select>
                            </div>
                        ) : ''
                    }
                    {
                        this.state.isEdit && this.props.userData && this.props.userData.role_id === 1 ?
                        (
                            <div className='create-ticket-item user-wrapper'>
                                <label>Assign To</label>
                                <input
                                    type="text"
                                    name=""
                                    value={data.assigned_to}
                                    id=""
                                    disabled={this.props.ticketDetails.status === 3}
                                    onFocus={ev => this.showUserList(true)}
                                    onChange={ev => this.onChange('assigned_to', ev)}
                                />
                               
                                <ul className={'assigned-to-list-wrapper ' + (this.state.isUserActive ? 'active' : '')}>
                                    {
                                        this.props.adminUsers &&
                                        this.props.adminUsers
                                            .filter(user => user.email.toLowerCase().indexOf(data.assigned_to.toLowerCase()) > -1 ||
                                                user.name.toLowerCase().indexOf(data.assigned_to.toLowerCase()) > -1)
                                            .map((user, index) => {
                                            return (
                                                <li key={index} onClick={ev => this.onUserClick(user)}>{user.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        ) : ''
                    }
                    <div className='create-ticket-item comment-section'>
                        <label>Comment</label>
                        <textarea
                            name=""
                            disabled={this.props.ticketDetails.status === 3}
                            id=""
                            onChange={ev => this.onChange('comment', ev)}
                        >
                        </textarea>
                    </div>
                    <div className='button-container'>
                        <button
                            className='btn primary-btn'
                            disabled={this.props.ticketDetails.status === 3}
                            type='submit'
                        >
                            {this.state.isEdit ? 'Update Ticket' : 'Create Ticket'}
                        </button>
                        <button
                            className='btn secondary-btn'
                            type='button'
                            onClick={() => this.cancelCreate()}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticketDetails: state.ticketReducer.ticketDetails,
        createTicketData: state.ticketReducer.createTicketData,
        adminUsers: state.ticketReducer.adminUsers,
        userData: state.userReducer.userData,
        createCommentData: state.commentsReducer.createCommentData
    }
}

const mapDispatchToStore = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ fetchTicket, createTicket, createComment, openSnackBar, updateTicket, fetchComments, fetchAdminUsers }, dispatch)
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToStore)(TicketFormComponent)
);