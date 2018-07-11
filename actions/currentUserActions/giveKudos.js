import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const giveKudosRequest = post_id => ({
    type: actionTypes.GIVE_KUDOS_REQUEST,
    payload: post_id
});

const giveKudosSuccess = (post_id, currentUser_id) => ({
    type: actionTypes.GIVE_KUDOS_SUCCESS,
    payload: post_id,
    meta: {
        currentUser_id
    }
});

const giveKudosFailed = error => ({
    type: actionTypes.GIVE_KUDOS_FAILED,
    error
});

export const giveKudos = (post_id, currentUser_id) => async dispatch => {
    dispatch(giveKudosRequest(post_id));
    const settings = {
        credentials: 'include',
        method: 'PUT'
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/kudos/${post_id}`, settings);
        return dispatch(giveKudosSuccess(post_id, currentUser_id));
    } catch (err) {
        dispatch(giveKudosFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
};