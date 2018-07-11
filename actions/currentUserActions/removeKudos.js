import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const removeKudosRequest = post_id => ({
    type:actionTypes.REMOVE_KUDOS_REQUEST,
    payload: post_id
});

const removeKudosSuccess = (post_id, currentUser_id) => ({
    type:actionTypes.REMOVE_KUDOS_SUCCESS,
    payload: post_id,
    meta: {
        currentUser_id
    }
});

const removeKudosFailed = error => ({
    type:actionTypes.REMOVE_KUDOS_FAILED,
    error
});

export const removeKudos = (post_id, currentUser_id) => async dispatch => {
    dispatch(removeKudosRequest(post_id));
    const settings = {
        credentials: 'include',
        method: 'DELETE'
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/kudos/${post_id}`, settings);
        return dispatch(removeKudosSuccess(post_id, currentUser_id));
    } catch (err) {
        dispatch(removeKudosFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
};
