import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Link from 'next/link';
import SignUpForm from './SignUpForm';


class SignUpFormContainer extends Component {
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





// return (
//     <div>
//         <form method="post" onSubmit={this.handleSubmit}>
//             <h1>Sign In</h1>

//             {   
//                 this.props.signUpDuplicateError && 
//                 <div style={{backgroundColor: 'palevioletred'}}>
//                     <p>Sorry, this username is taken, please select a different one.</p>
//                 </div>
//             }

//             <fieldset>
//                 <legend>Please enter account details to sign up.</legend>
//                 <label htmlFor="username">Username</label>
//                 <input 
//                     type="text" 
//                     id="username" 
//                     name="user_name" 
//                     onChange={e => this.handleFieldUpdate('username', e.target.value)}
//                 />
//                 <label htmlFor="email">Email</label>
//                 <input 
//                     type="email" 
//                     id="email" 
//                     name="email"
//                     onChange={e => this.handleFieldUpdate('email', e.target.value)}  
//                 />
//                 <label htmlFor="password">Password</label>
//                 <input 
//                     type="password" 
//                     id="password" 
//                     name="password" 
//                     onChange={e => this.handleFieldUpdate('password', e.target.value)}
//                 />
//                 <label htmlFor="passwordConfirm">Confirm your password</label>
//                 <input 
//                     type="password" 
//                     id="passwordConfirm" 
//                     name="password_confirm" 
//                     onChange={e => this.handleFieldUpdate('passwordConfirm', e.target.value)}
//                 />
//                 <button type="submit">Sign Up</button>
//             </fieldset>
//         </form>
//         <Link href="/signin">
//             <a>Already have an account? Sign in!</a>
//         </Link>
//     </div>
// )