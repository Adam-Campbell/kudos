import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Link from 'next/link';
import SignUpForm from './SignUpForm';

export class SignUpFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, email, password, confirmPassword } = this.state;
        if (!username || !email || !password || !confirmPassword) {
            alert('Please ensure you have filled out all of the required fields');
        } else if (password !== confirmPassword) {
            alert("Your password confirmation doesn't match, please re-enter your password")
        } else {
            this.props.signUp(username, email, password);
        }
    }

    render() {
        return <SignUpForm 
            handleSubmit={this.handleSubmit}
            handleUsernameUpdate={this.handleFieldUpdate('username')}
            handleEmailUpdate={this.handleFieldUpdate('email')}
            handlePasswordUpdate={this.handleFieldUpdate('password')}
            handleConfirmPasswordUpdate={this.handleFieldUpdate('confirmPassword')}
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}

        />
    }
}

const mapStateToProps = state => ({
    signUpDuplicateError: state.currentUser.signUpDuplicateError
});

export default connect(
    mapStateToProps, 
    {
        signUp: ActionCreators.signUp
    }
)(SignUpFormContainer);
