import React, { Component } from 'react';
import { connect } from "react-redux";

import './index.scss';

class SnackBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            action: true
        }

        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.setPropsToState = this.setPropsToState.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
        
    }

    componentDidMount() {
        this.setPropsToState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setPropsToState(nextProps)
    }

    setPropsToState(props) {
        const { open } = props;
        if (open) {
            this.setState({
                ...this.state,
                open: true
            }, () => {
                setTimeout(() => {
                    this.closeSnackBar();
                }, 3000)
            })
        }
    }

    closeSnackBar() {
        this.setState({
            ...this.state,
            open: false
        })
    }

    render () {
        return (
            <span className={'snackbar ' + (this.state.open ? 'open' : '')}>
                <span className='message'>{this.props.message ? this.props.message : 'Snackbar' }</span>
                {
                    this.state.action ?
                    (
                        <span className='close-btn' onClick={ev => this.closeSnackBar()}></span>
                    ) : ''
                }
            </span>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.snackBarReducer.snackBarOpen,
        message: state.snackBarReducer.snackBarData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (SnackBar)