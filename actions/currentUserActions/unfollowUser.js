import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const unfollowUserRequest = user_id => ({
    type: actionTypes.UNFOLLOW_USER_REQUEST,
    payload: user_id
});

const unfollowUserSuccess = user_id => ({
    type: actionTypes.UNFOLLOW_USER_SUCCESS,
    payload: user_id
});

const unfollowUserFailed = error => ({
    type: actionTypes.UNFOLLOW_USER_FAILED,
    error
});

export const unfollowUser = (user_id) => async dispatch => {
    dispatch(unfollowUserRequest(user_id));
    const settings = {
        credentials: 'include',
        method: 'DELETE'
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/follows/${user_id}`, settings);
        return dispatch(unfollowUserSuccess(user_id));
    } catch (err) {
        dispatch(unfollowUserFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}
