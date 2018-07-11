import * as actionTypes from '../../actionTypes';
import Router from 'next/router';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../../globalConstants';
import { fetchCurrentUser } from '../currentUserActions/fetchCurrentUser';
import { fetchData } from '../../utils';

const signInRequest = () => ({
    type: actionTypes.SIGN_IN_REQUEST
});

const signInSuccess = (token) => ({
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: token
});

const signInFailed = (error) => ({
    type: actionTypes.SIGN_IN_FAILED,
    error
});

const makeSignInRequest = async (username, password, dispatch) => {
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'post',
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    try {
        const response = await fetchData(`${rootApiUrl}/auth/signin`, settings);
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const signIn = (username, password) => async dispatch => {
    dispatch(signInRequest());
    try {
        const token = await makeSignInRequest(username, password, dispatch);
        //console.log(document.cookie);
        //console.log(token);
        //document.cookie = `token=${token.token};expires=${new Date(Date.now() + 36000000).toUTCString()}`;
        dispatch(signInSuccess(token.token));
        //await dispatch(fetchCurrentUser(token.token));
        await dispatch(fetchCurrentUser(token.token));
        Router.push('/');
    } catch (err) {
        return err;
    }
}