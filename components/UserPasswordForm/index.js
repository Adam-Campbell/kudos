import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import UserPasswordForm from './UserPasswordForm';

class UserPasswordFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            currentPassword: '',
            newPassword: '',
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
        const { currentPassword, newPassword, confirmPassword } = this.state;
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("You have failed to enter one or more fields, please review the form and submit again");
        } else if (newPassword !== confirmPassword) {
            alert("Your new password confirmation doesn't match your new password, please update these fields");
        } else {
            this.props.updateUserPassword(currentPassword, newPassword, this.props.token);
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

const mapStateToProps = state => ({
    token: state.currentUser.token
});

export default connect(
    mapStateToProps,
    { updateUserPassword: ActionCreators.updateUserPassword }
)(UserPasswordFormContainer);
