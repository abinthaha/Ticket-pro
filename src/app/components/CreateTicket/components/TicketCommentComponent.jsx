import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { fetchComments } from '../data/action';
import '../styles/comments.scss';

class TicketCommentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketId: '',
            isEdit: false,
            commentsData: []
        }
    }

    componentDidMount() {
        this.setPropsToState(this.props);
        this.getTicketId(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setPropsToState(nextProps);
        this.getTicketId(nextProps);
    }

    setPropsToState(props) {
        this.setState({
            ...this.state,
            commentsData: props.commentsData
        })
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
                    this.props.fetchComments(this.state.ticketId);
                })
            }
        }
    }

    render() {

        const { commentsData, ticketId } = this.state;

        const comments = commentsData && commentsData.map(comment => {
            return (
                <li key={comment.id} className='comments-item'>
                    <span className='comment-date'>{new Date(comment.date).toLocaleDateString()} {new Date(comment.date).toLocaleTimeString()}</span>
                    <span className='comment-data'>{comment.comment}</span>
                </li>
            )
        })

        return (
            ticketId ? (
                <section className='comments-wrapper'>   
                    <ul className='comments-list'>
                        {comments}
                    </ul>
                </section>
            ) : ''
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentsData: state.commentsReducer.commentsData,
        commentsError: state.commentsReducer.commentsError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ fetchComments }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketCommentComponent));