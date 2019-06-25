import React, { Component } from 'react';

import './index.scss';

class SnackBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.setPropstoState = this.setPropstoState.bind(this);
    }

    componentDidMount() {
        this.setPropstoState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setPropstoState(nextProps)
    }

    setPropstoState(props) {
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
        }, () => {
            this.props.handleCloseSnackbar();
        })
    }

    render () {
        return (
            <span className={'snackbar ' + (this.state.open ? 'open' : '')}>
                <span className='message'>{this.props.message}</span>
            </span>
        )
    }
}

export default SnackBar;