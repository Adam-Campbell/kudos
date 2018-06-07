import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PasswordResetEmailReqForm from './PasswordResetEmailReqForm';

export class PasswordResetEmailReqFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.closeSuccessModal = this.closeSuccessModal.bind(this);
        this.state = {
            email: ''
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email;
        this.props.getPasswordResetEmail(email);
        this.setState({email: ''});
    }

    closeErrorModal() {
        this.props.emailNotFoundErrorAcknowledge();
    }

    closeSuccessModal() {
        this.props.passwordResetEmailSentAcknowledge();
    }

    render() {
        return <PasswordResetEmailReqForm 
            handleSubmit={this.handleSubmit}
            handleEmailUpdate={this.handleFieldUpdate('email')}
            email={this.state.email}
            emailNotFound={this.props.emailNotFound}
            passwordResetEmailSent={this.props.passwordResetEmailSent}
            closeSuccessModal={this.closeSuccessModal}
            closeErrorModal={this.closeErrorModal}
        />
    }
} 

const mapStateToProps = state => ({
    emailNotFound: state.errors.emailNotFound,
    passwordResetEmailSent: state.successes.passwordResetEmailSent
});

export default connect(
    mapStateToProps,
    {
        getPasswordResetEmail: ActionCreators.getPasswordResetEmail,
        emailNotFoundErrorAcknowledge: ActionCreators.emailNotFoundErrorAcknowledge,
        passwordResetEmailSentAcknowledge: ActionCreators.passwordResetEmailSentAcknowledge
    }
)(PasswordResetEmailReqFormContainer);
