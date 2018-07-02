import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';  
import { sortComments } from '../utils';
import { storeComment } from './documentActions';

/*****************
    replyToPost
*****************/

const replyToPostRequest = () => ({
    type: actionTypes.REPLY_TO_POST_REQUEST
});

const replyToPostSuccess = () => ({
    type: actionTypes.REPLY_TO_POST_SUCCESS
});

const replyToPostFailed = () => ({
    type: actionTypes.REPLY_TO_POST_FAILED
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
        const response = await fetch(`${rootApiUrl}/api/posts/${post_id}/comments`, settings);
        if (!response.ok) {
            return dispatch(replyToPostFailed());
        }
        const responseJSON = await response.json();

        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = responseJSON.discussion;
        // In order to sort we need the full comment objects not just the comment _ids
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
        // Now sort the comments
        const sortedComments = sortComments([...existingComments, {...commentObject}]);

        dispatch(
            storeComment(
                responseJSON, 
                responseJSON._id, 
                responseJSON.discussion, 
                responseJSON.author,
                sortedComments
            )
        );
        dispatch(replyToPostSuccess());
    } catch (err) {
        console.log(err);
    }
};

/*********************
    replyToComment
*********************/

const replyToCommentRequest = () => ({
    type: actionTypes.REPLY_TO_COMMENT_REQUEST
});

const replyToCommentSuccess = () => ({
    type: actionTypes.REPLY_TO_COMMENT_SUCCESS
});

// const replyToCommentSuccess = (comment, comment_id, discussion_id, author_id, sortedComments) => ({
//     type: actionTypes.REPLY_TO_COMMENT_SUCCESS,
//     payload: comment,
//     comment_id,
//     discussion_id,
//     author_id,
//     sortedComments
// });

const replyToCommentFailed = () => ({
    type: actionTypes.REPLY_TO_COMMENT_FAILED
});

export const replyToComment = (commentRaw, parentComment_id, token) => async (dispatch, getState) => {
    dispatch(replyToCommentRequest());
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
        const response = await fetch(`${rootApiUrl}/api/comments/${parentComment_id}`, settings);
        if (!response.ok) {
            return dispatch(replyToCommentFailed());
        }
        const responseJSON = await response.json();
        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = responseJSON.discussion;
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
        const sortedComments = sortComments([...existingComments, {...commentObject}]);
        dispatch(
            storeComment(
                responseJSON, 
                responseJSON._id,
                responseJSON.discussion,
                responseJSON.author,
                sortedComments
            )
        );
        dispatch(replyToCommentSuccess());
    } catch (err) {
        console.log(err);
    }
}

/********************
    deleteComment
********************/

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

const deleteCommentFailed = () => ({
    type: actionTypes.DELETE_COMMENT_FAILED
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
        const response = await fetch(`${rootApiUrl}/api/comments/${comment_id}`, settings);
        if (!response.ok) {
            return dispatch(deleteCommentFailed());
        }
        const responseJSON = await response.json();
        dispatch(deleteCommentSuccess(responseJSON, comment_id, currentUser_id));
    } catch (err) {
        console.log(err);
    }
}

/***************** 
    editComment
*****************/

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

const editCommentFailed = () => ({
    type: actionTypes.EDIT_COMMENT_FAILED
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
        const response = await fetch(`${rootApiUrl}/api/comments/${comment_id}`, settings);
        if (!response.ok) {
            return dispatch(editCommentFailed());
        }
        const responseJSON = await response.json();
        responseJSON.author = responseJSON.author._id;
        dispatch(editCommentSuccess(responseJSON, responseJSON._id));
    } catch (err) {
        console.log(err);
    }
}