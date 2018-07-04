import * as actionTypes from '../../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../../globalConstants';

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
        dispatch(setNewPasswordFailed());
    }
} 