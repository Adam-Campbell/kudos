import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import UserPasswordForm from './UserPasswordForm';

export class UserPasswordFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            missingFieldsError: false,
            nonMatchingPasswordsError: false
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = this.state;
        if (!currentPassword || !newPassword || !confirmPassword) {
            this.setState({
                missingFieldsError: true,
                nonMatchingPasswordsError: false
            });
        } else if (newPassword !== confirmPassword) {
            this.setState({
                missingFieldsError: false,
                nonMatchingPasswordsError: true
            });
        } else {
            this.setState({
                missingFieldsError: false,
                nonMatchingPasswordsError: false
            });
            this.props.updateUserPassword(currentPassword, newPassword);
        }
    }

    render() {
        return <UserPasswordForm 
            handleSubmit={this.handleSubmit}
            handleCurrentPasswordUpdate={this.handleFieldUpdate('currentPassword')}
            handleNewPasswordUpdate={this.handleFieldUpdate('newPassword')}
            handleConfirmPasswordUpdate={this.handleFieldUpdate('confirmPassword')}
            currentPassword={this.state.currentPassword}
            newPassword={this.state.newPassword}
            confirmPassword={this.state.confirmPassword}
        />
    }
}

export default connect(
    null,
    { updateUserPassword: ActionCreators.updateUserPassword }
)(UserPasswordFormContainer);
