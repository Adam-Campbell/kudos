import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';
import { storeCurrentUser } from '../documentActions';

const updateUserDetailsRequest = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_REQUEST
});

const updateUserDetailsSuccess = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_SUCCESS
});

const updateUserDetailsFailed = (error) => ({
    type: actionTypes.UPDATE_USER_DETAILS_FAILED,
    error
});

export const updateUserDetails = (newDetails, currentUser_id) => async dispatch => {
    dispatch(updateUserDetailsRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({
            username: newDetails.username,
            email: newDetails.email,
            bio: newDetails.bio
        })
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/me`, settings);
        dispatch(storeCurrentUser(response, currentUser_id));
        return dispatch(updateUserDetailsSuccess());
    } catch (err) {
        dispatch(updateUserDetailsFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}
