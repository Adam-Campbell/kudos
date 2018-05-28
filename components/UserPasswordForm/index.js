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



// return (
//     <form method="put" id="passwordForm" onSubmit={this.handleSubmit}>
//         <fieldset>
//             <legend>Update your password</legend>

//             <label htmlFor="currentPassword">Enter your current password:</label>
//             <input 
//                 type="password" 
//                 id="currentPassword" 
//                 name="current_password" 
//                 onChange={(e) => this.handleFieldUpdate('currentPw', e.target.value)}
//             />
//             <label htmlFor="newPassword">Enter your new password:</label>
//             <input 
//                 type="password" 
//                 id="newPassword" 
//                 name="new_password" 
//                 onChange={(e) => this.handleFieldUpdate('newPw', e.target.value)}
//             />
//             <label htmlFor="newPasswordConfirm">Confirm your new password:</label>
//             <input 
//                 type="password" 
//                 id="newPasswordConfirm" 
//                 name="new_password_confirm" 
//                 onChange={(e) => this.handleFieldUpdate('newPwConfirm', e.target.value)}
//             />
//             <button type="submit">Save Password</button>
//         </fieldset>
//     </form>
// )