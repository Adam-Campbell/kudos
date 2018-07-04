import * as actionTypes from '../../actionTypes';
import Router from 'next/router';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../../globalConstants';
import { fetchCurrentUser } from '../currentUserActions/fetchCurrentUser';
import { fetchData } from '../../utils';

const signUpRequest = () => ({
    type: actionTypes.SIGN_UP_REQUEST
});

const signUpSuccess = (token) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: token
});

const signUpFailed = (error) => ({
    type: actionTypes.SIGN_UP_FAILED,
    error
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
        dispatch(signUpFailed(err));
    }
} 