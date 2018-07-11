import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';  
import { sortComments, fetchData } from '../../utils';
import { storeComment } from '../documentActions';
import { tokenExpired } from '../authActions';

const replyToCommentRequest = () => ({
    type: actionTypes.REPLY_TO_COMMENT_REQUEST
});

const replyToCommentSuccess = () => ({
    type: actionTypes.REPLY_TO_COMMENT_SUCCESS
});

const replyToCommentFailed = (error) => ({
    type: actionTypes.REPLY_TO_COMMENT_FAILED,
    error
});

export const replyToComment = (commentRaw, parentComment_id) => async (dispatch, getState) => {
    dispatch(replyToCommentRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'post',
        body: JSON.stringify({
            text: commentRaw
        })
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/comments/${parentComment_id}`, settings);
        console.log(response);
        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = response.discussion;
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
        const sortedComments = sortComments([...existingComments, {...response}]);
        console.log(sortedComments);
        dispatch(
            storeComment(
                response, 
                response._id,
                response.discussion,
                response.author,
                sortedComments
            )
        );
        dispatch(replyToCommentSuccess());
    } catch (err) {
        console.log(err);
        dispatch(replyToCommentFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}