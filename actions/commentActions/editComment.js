import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';  
import { fetchData } from '../../utils';
import { storeComment } from '../documentActions';
import { tokenExpired } from '../authActions';

const editCommentRequest = () => ({
    type: actionTypes.EDIT_COMMENT_REQUEST
});

const editCommentSuccess = (comment, comment_id) => ({
    type: actionTypes.EDIT_COMMENT_SUCCESS,
    payload: comment,
    meta: {
        comment_id
    }
});

const editCommentFailed = (error) => ({
    type: actionTypes.EDIT_COMMENT_FAILED,
    error
});

export const editComment = (commentText, comment_id, token) => async dispatch => {
    dispatch(editCommentRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            text: commentText
        })
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/comments/${comment_id}`, settings);
        response.author = response.author._id;
        dispatch(editCommentSuccess(response, response._id));
    } catch (err) {
        dispatch(editCommentFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}
