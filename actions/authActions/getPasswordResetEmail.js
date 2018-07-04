import * as actionTypes from '../../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../../globalConstants';

const getPasswordResetEmailRequest = () => ({
    type: actionTypes.GET_PASSWORD_RESET_EMAIL_REQUEST
});

const getPasswordResetEmailSuccess = () => ({
    type: actionTypes.GET_PASSWORD_RESET_EMAIL_SUCCESS
});

const getPasswordResetEmailFailed = (error) => ({
    type: actionTypes.GET_PASSWORD_RESET_EMAIL_FAILED,
    error
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
                return 'email_not_found';
            }
            return;
        }
        dispatch(getPasswordResetEmailSuccess());
        return 'email_sent';
    } catch (err) {
        dispatch(getPasswordResetEmailFailed());
    }
};
