import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';  
import { sortComments, fetchData } from '../../utils';
import { storeComment } from '../documentActions';
import { tokenExpired } from '../authActions';

const replyToPostRequest = () => ({
    type: actionTypes.REPLY_TO_POST_REQUEST
});

const replyToPostSuccess = () => ({
    type: actionTypes.REPLY_TO_POST_SUCCESS
});

const replyToPostFailed = (error) => ({
    type: actionTypes.REPLY_TO_POST_FAILED,
    error
});

export const replyToPost = (commentRaw, post_id, token) => async (dispatch, getState) => {
    dispatch(replyToPostRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            text: commentRaw
        })
    };
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts/${post_id}/comments`, settings);
        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = response.discussion;
        // In order to sort we need the full comment objects not just the comment _ids
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
        // Now sort the comments
        const sortedComments = sortComments([...existingComments, {...response}]);

        dispatch(
            storeComment(
                response, 
                response._id, 
                response.discussion, 
                response.author,
                sortedComments
            )
        );
        dispatch(replyToPostSuccess());
    } catch (err) {
        console.log(err);
        dispatch(replyToPostFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
};
