import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Link from 'next/link';
import SignInForm from './SignInForm';

export class SignInFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.signIn(username, password);
    }

    render() {
        return <SignInForm 
            handleSubmit={this.handleSubmit}
            handleUsernameUpdate={this.handleFieldUpdate('username')}
            handlePasswordUpdate={this.handleFieldUpdate('password')}
            username={this.state.username}
            password={this.state.password}
        />
    }
}

export default connect(null, {signIn: ActionCreators.signIn})(SignInFormContainer);
