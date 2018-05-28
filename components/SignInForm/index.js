import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Link from 'next/link';
import SignInForm from './SignInForm';

class SignInFormContainer extends Component {
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



/* <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <h1>Sign In</h1>
                    <fieldset>
                        <legend>Please enter account details to sign in.</legend>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="user_name" ref={el => this.username = el} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" ref={el => this.password = el} />
                        <button type="submit">Sign In</button>
                    </fieldset>
                </form>
                <Link href="/forgot">
                    <a>Forgotten password?</a>
                </Link>
                <Link href="/signup">
                    <a>Don't have an account? Sign up!</a>
                </Link>
            </div> */