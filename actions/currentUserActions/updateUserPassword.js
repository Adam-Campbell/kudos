import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const updateUserPasswordRequest = () => ({
    type: actionTypes.UPDATE_USER_PASSWORD_REQUEST
});

const updateUserPasswordSuccess = () => ({
    type: actionTypes.UPDATE_USER_PASSWORD_SUCCESS
});

const updateUserPasswordFailed = (error) => ({
    type: actionTypes.UPDATE_USER_PASSWORD_FAILED,
    error
});

export const updateUserPassword = (currentPw, newPw) => async dispatch => {
    dispatch(updateUserPasswordRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
            old: currentPw,
            new: newPw
        })
    }
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/password`, settings);
        return dispatch(updateUserPasswordSuccess());
    } catch (err) {
        dispatch(updateUserPasswordFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}
