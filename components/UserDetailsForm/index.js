import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import UserDetailsForm from './UserDetailsForm';

export class UserDetailsFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const { username, bio } = this.props.users[this.props.currentUser_id];
        this.state = { 
            username: username,
            email: this.props.email,
            bio: bio
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateUserDetails(this.state, this.props.currentUser_id, this.props.token);
    }

    render() {
        return <UserDetailsForm 
            handleSubmit={this.handleSubmit}
            handleUsernameUpdate={this.handleFieldUpdate('username')}
            handleEmailUpdate={this.handleFieldUpdate('email')}
            handleBioUpdate={this.handleFieldUpdate('bio')}
            username={this.state.username}
            email={this.state.email}
            bio={this.state.bio}
        />
    }   
}

const mapStateToProps = state => ({
    users: state.users.models,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token,
    email: state.currentUser.email
});

export default connect(
    mapStateToProps,
    {
        updateUserDetails: ActionCreators.updateUserDetails
    }
)(UserDetailsFormContainer);
