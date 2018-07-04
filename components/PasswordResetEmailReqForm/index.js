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
        this.acknowledgeEmailNotFound = this.acknowledgeEmailNotFound.bind(this);
        this.acknowledgeEmailSent = this.acknowledgeEmailSent.bind(this);
        this.state = {
            email: '',
            showEmailNotFoundState: false,
            showEmailSentState: false
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    acknowledgeEmailNotFound() {
        this.setState({ showEmailNotFoundState: false });
    }

    acknowledgeEmailSent() {
        this.setState({ showEmailSentState: false });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email;
        const submitResponse = await this.props.getPasswordResetEmail(email);
        console.log(submitResponse);
        if (submitResponse === 'email_sent') {
            this.setState({ email: '', showEmailSentState: true });
        } else if (submitResponse === 'email_not_found') {
            this.setState({ showEmailNotFoundState: true });
        }
    }

    closeErrorModal() {
        //this.props.emailNotFoundErrorAcknowledge();
    }

    closeSuccessModal() {
        //this.props.passwordResetEmailSentAcknowledge();
    }

    render() {
        return <PasswordResetEmailReqForm 
            handleSubmit={this.handleSubmit}
            handleEmailUpdate={this.handleFieldUpdate('email')}
            email={this.state.email}
            emailNotFound={this.state.showEmailNotFoundState}
            emailSent={this.state.showEmailSentState}
            closeSuccessModal={this.closeSuccessModal}
            closeErrorModal={this.closeErrorModal}
        />
    }
} 

export default connect(
    null,
    {
        getPasswordResetEmail: ActionCreators.getPasswordResetEmail,
    }
)(PasswordResetEmailReqFormContainer);
