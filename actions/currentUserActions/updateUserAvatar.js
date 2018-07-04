import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';
import { storeCurrentUser } from '../documentActions';

const updateUserAvatarRequest = () => ({
    type: actionTypes.UPDATE_USER_AVATAR_REQUEST
});

const updateUserAvatarSuccess = () => ({
    type: actionTypes.UPDATE_USER_AVATAR_SUCCESS
});

const updateUserAvatarFailed = (error) => ({
    type: actionTypes.UPDATE_USER_AVATAR_FAILED,
    error
});

export const updateUserAvatar = (formData, token) => async dispatch => {
    dispatch(updateUserAvatarRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: formData
    }
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/images`, settings);
        dispatch(storeCurrentUser(response, response._id));
        return dispatch(updateUserAvatarSuccess());
    } catch (err) {
        dispatch(updateUserAvatarFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}
