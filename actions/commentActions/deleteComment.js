import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';  
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const deleteCommentRequest = () => ({
    type: actionTypes.DELETE_COMMENT_REQUEST
});

const deleteCommentSuccess = (comment, comment_id, author_id) => ({
    type: actionTypes.DELETE_COMMENT_SUCCESS,
    payload: {
        comment,
        comment_id
    },
    meta: {
        author_id
    }
});

const deleteCommentFailed = (err) => ({
    type: actionTypes.DELETE_COMMENT_FAILED,
    error
});

export const deleteComment = (comment_id, currentUser_id, token) => async dispatch => {
    dispatch(deleteCommentRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'delete',
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/comments/${comment_id}`, settings);
        dispatch(deleteCommentSuccess(response, comment_id, currentUser_id));
    } catch (err) {
        dispatch(deleteCommentFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}
