import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const followUserRequest = user_id => ({
    type:actionTypes.FOLLOW_USER_REQUEST,
    payload: user_id
});

const followUserSuccess = user_id => ({
    type: actionTypes.FOLLOW_USER_SUCCESS,
    payload: user_id
});

const followUserFailed = error => ({
    type: actionTypes.FOLLOW_USER_FAILED,
    error
});

export const followUser = (user_id) => async dispatch => {
    dispatch(followUserRequest(user_id));
    const settings = {
        credentials: 'include',
        method: 'PUT'
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/follows/${user_id}`, settings);
        return dispatch(followUserSuccess(user_id));
    } catch (err) {
        dispatch(followUserFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}