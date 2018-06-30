import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import Router from 'next/router';
import { rootApiUrl } from '../globalConstants';
import { fetchCurrentUser } from './currentUserActions';
import { emailNotFoundErrorRegister } from './errorActions';
import { passwordResetEmailSentRegister } from './successActions';

/************
    signIn
************/

const signInRequest = () => ({
    type: actionTypes.SIGN_IN_REQUEST
});

const signInSuccess = (token) => ({
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: token
});

const signInFailed = (responseCode) => ({
    type: actionTypes.SIGN_IN_FAILED,
    responseCode: responseCode
});

const makeSignInRequest = async (username, password, dispatch) => {
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    try {
        const response = await fetch(`${rootApiUrl}/auth/signin`, settings);
        if (!response.ok) {
            dispatch(signInFailed(response.status));
            return Promise.reject();
        }
        const responseJSON = await response.json();
        return responseJSON;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const signIn = (username, password) => async dispatch => {
    dispatch(signInRequest());
    try {
        const token = await makeSignInRequest(username, password, dispatch);
        document.cookie = `token=${token.token};expires=${new Date(Date.now() + 3600000).toUTCString()}`;
        dispatch(signInSuccess(token.token));
        await dispatch(fetchCurrentUser(token.token));
        Router.push('/');
    } catch (err) {
        return err;
    }
}

/*************
    signOut
*************/

const signOutSuccess = () => ({
    type: actionTypes.SIGN_OUT_SUCCESS
});

export const signOut = () => async dispatch => {
    document.cookie = `token=;expires=${new Date(Date.now() - 3600000).toUTCString()}`;
    dispatch(signOutSuccess());
}

/************
    signUp
************/

const signUpRequest = () => ({
    type: actionTypes.SIGN_UP_REQUEST
});

const signUpSuccess = (token) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: token
});

const signUpFailed = (error) => ({
    type: actionTypes.SIGN_UP_FAILED,
    payload: error
});

const makeSignUpRequest = async (username, email, password, dispatch) => {
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    };
    try {
        const response = await fetch(`${rootApiUrl}/api/users`, settings);
        if (!response.ok) {
            const error = await response.text();
            return Promise.reject(error);
        }
        const responseJSON = await response.json();
        return responseJSON;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const signUp = (username, email, password) => async dispatch => {
    dispatch(signUpRequest());
    try {
        const token = await makeSignUpRequest(username, email, password, dispatch);
        document.cookie = `token=${token.token};expires=${new Date(Date.now() + 3600000).toUTCString()}`;
        dispatch(signUpSuccess(token.token));
        await dispatch(fetchCurrentUser(token.token));
        Router.push('/');
    } catch (err) {
        console.log(err);
        dispatch(signUpFailed(err));
    }
} 

/***************************
    getPasswordResetEmail
***************************/

const getPasswordResetEmailRequest = () => ({
    type: actionTypes.GET_PASSWORD_RESET_EMAIL_REQUEST
});

const getPasswordResetEmailSuccess = () => ({
    type: actionTypes.GET_PASSWORD_RESET_EMAIL_SUCCESS
});

const getPasswordResetEmailFailed = (httpStatusCode, errorMessage) => ({
    type: actionTypes.GET_PASSWORD_RESET_EMAIL_FAILED,
    payload: {
        httpStatusCode,
        errorMessage
    }
});

export const getPasswordResetEmail = email => async dispatch => {
    dispatch(getPasswordResetEmailRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            email: email
        })
    };
    try {
        const response = await fetch(`${rootApiUrl}/auth/forgot`, settings);
        if (!response.ok) {
            const httpStatusCode = response.status;
            const errorMessage = await response.text();
            dispatch(getPasswordResetEmailFailed(httpStatusCode, errorMessage));
            if (httpStatusCode === 401) {
                dispatch(emailNotFoundErrorRegister());
            }
            return;
        }
        dispatch(getPasswordResetEmailSuccess());
        dispatch(passwordResetEmailSentRegister());
    } catch (err) {
        console.log(err);
    }
};

/********************
    setNewPassword
********************/

const setNewPasswordRequest = () => ({
    type: actionTypes.SET_NEW_PASSWORD_REQUEST
});

const setNewPasswordSuccess = () => ({
    type: actionTypes.SET_NEW_PASSWORD_SUCCESS
});

const setNewPasswordFailed = (httpStatusCode, errorMessage) => ({
    type: actionTypes.SET_NEW_PASSWORD_FAILED,
    payload: {
        httpStatusCode,
        errorMessage
    }
});

export const setNewPassword = (password, resetPasswordToken) => async dispatch => {
    dispatch(setNewPasswordRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            password: password
        })
    }; 
    try {
        const response = await fetch(`${rootApiUrl}/auth/reset/${resetPasswordToken}`, settings);
        if (!response.ok) {
            const httpStatusCode = response.status;
            const errorMessage = await response.text();
            return dispatch(setNewPasswordFailed(httpStatusCode, errorMessage));
        }
        dispatch(setNewPasswordSuccess());
    } catch (err) {
        console.log(err);
    }
} 

