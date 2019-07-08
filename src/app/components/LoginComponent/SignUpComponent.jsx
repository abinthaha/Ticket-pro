import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { openSnackBar } from "../../common/Snackbar/action";

import { userSignUp } from './data/action';

import './styles/styles.scss';

class SignUpComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            !nextProps.signUpError &&
            nextProps.signUpData
        ) {
            this.props.openSnackBar("Sign Up Success using Email " + this.state.data.email);
            this.goBack();
        } else if (nextProps.signUpError) {
            this.props.openSnackBar(nextProps.signUpError.data);
        }
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
        const { data } = this.state;
        const signUpData = {
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "confirm_password": data.confirm_password,
            "role_id": 2
        }

        this.props.userSignUp(signUpData);
    }

    
    goBack() {
        this.props.history.push('/login')
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
                                type="text"
                                className="text-input"
                                onChange={ev => this.inputChange(ev, "name")}
                                required
                                placeholder="Name"
                            />
                        </div>
                        <div className="login-row">
                            <input
                                type="email"
                                className="text-input"
                                onChange={ev => this.inputChange(ev, "email")}
                                required
                                placeholder="Email"
                            />
                        </div>
                        <div className="login-row">
                            <input
                                type="password"
                                className="text-input"
                                onChange={ev => this.inputChange(ev, "password")}
                                required
                                placeholder="Password"
                            />
                        </div>
                        <div className="login-row">
                            <input
                                type="password"
                                className="text-input"
                                onChange={ev => this.inputChange(ev, "confirm_password")}
                                required
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="login-row">
                            <input
                                type="submit"
                                className="submit-button btn primary-btn"
                                value="Sign Up"
                            />
                            <input
                                type="button"
                                className="sign-up-btn btn secondary-btn"
                                value="Cancel"
                                onClick={ev => this.goBack()}
                            />
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

const mapState = state => {
    return {
        signUpData: state.loginReducer.signUpData,
        signUpError: state.loginReducer.signUpError
    }
}

const mapDispatch = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ userSignUp, openSnackBar }, dispatch)
    }
}

export default withRouter(
    connect(mapState, mapDispatch)(SignUpComponent)
)