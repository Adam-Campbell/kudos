import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PasswordResetForm from './PasswordResetForm';
import Router from 'next/router';

class PasswordResetFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
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
        const { password, confirmPassword } = this.state;
        if (!password || !confirmPassword) {
            alert('Please ensure you have filled out all of the required fields');
        } else if (password !== confirmPassword) {
            alert("Your password confirmation doesn't match, please re-enter your password");
        } else {
            this.props.setNewPassword(password, this.props.resetPasswordToken);
            this.setState({ 
                password: '',
                confirmPassword: '' 
            });
        }
    }

    handleRedirect() {
        Router.push('/');
    }

    render() {
        return <PasswordResetForm 
            handleSubmit={this.handleSubmit}
            handlePasswordUpdate={this.handleFieldUpdate('password')}
            handleConfirmPasswordUpdate={this.handleFieldUpdate('confirmPassword')}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            handleRedirect={this.handleRedirect}
        />
    }
} 



export default connect(
    null,
    {
        setNewPassword: ActionCreators.setNewPassword
    }
)(PasswordResetFormContainer);
