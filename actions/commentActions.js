import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';  
import { sortComments } from '../utils';

const replyToPostRequest = () => ({
    type: actionTypes.REPLY_TO_POST_REQUEST
});

const replyToPostSuccess = (comment, comment_id, discussion_id, author_id, sortedComments) => ({
    type: actionTypes.REPLY_TO_POST_SUCCESS,
    payload: comment,
    comment_id,
    discussion_id,
    author_id,
    sortedComments
});

const replyToPostFailed = () => ({
    type: actionTypes.REPLY_TO_POST_FAILED
});

export const replyToPost = (commentText, post_id, token) => async (dispatch, getState) => {
    dispatch(replyToPostRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            text: commentText
        })
    };
    try {
        const commentReq = await fetch(`${rootApiUrl}/api/posts/${post_id}/comments`, settings);
        if (!commentReq.ok) {
            return dispatch(replyToPostFailed());
        }
        const commentObject = await commentReq.json();

        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = commentObject.discussion;
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
        const sortedComments = sortComments([...existingComments, {...commentObject}]);

        dispatch(replyToPostSuccess(
            commentObject, 
            commentObject._id, 
            commentObject.discussion, 
            commentObject.author,
            sortedComments
        ));
    } catch (err) {
        console.log(err);
    }
};

const replyToCommentRequest = () => ({
    type: actionTypes.REPLY_TO_COMMENT_REQUEST
});

const replyToCommentSuccess = (comment, comment_id, discussion_id, author_id, sortedComments) => ({
    type: actionTypes.REPLY_TO_COMMENT_SUCCESS,
    payload: comment,
    comment_id,
    discussion_id,
    author_id,
    sortedComments
});

const replyToCommentFailed = () => ({
    type: actionTypes.REPLY_TO_COMMENT_FAILED
});

export const replyToComment = (commentText, parentComment_id, token) => async (dispatch, getState) => {
    dispatch(replyToCommentRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            text: commentText
        })
    };
    try {
        const commentReq = await fetch(`${rootApiUrl}/api/comments/${parentComment_id}`, settings);
        if (!commentReq.ok) {
            return dispatch(replyToCommentFailed());
        }
        const commentObject = await commentReq.json();
        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = commentObject.discussion;
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
        const sortedComments = sortComments([...existingComments, {...commentObject}]);
        dispatch(replyToCommentSuccess(
            commentObject, 
            commentObject._id,
            commentObject.discussion,
            commentObject.author,
            sortedComments
        ));
    } catch (err) {
        console.log(err);
    }
}

const deleteCommentRequest = () => ({
    type: actionTypes.DELETE_COMMENT_REQUEST
});

const deleteCommentSuccess = (comment, comment_id, author_id) => ({
    type: actionTypes.DELETE_COMMENT_SUCCESS,
    payload: comment,
    comment_id,
    author_id
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
        const deleteCommentReq = await fetch(`${rootApiUrl}/api/comments/${comment_id}`, settings);
        if (!deleteCommentReq.ok) {
            return dispatch(deleteCommentFailed());
        }
        const commentObject = await deleteCommentReq.json();
        dispatch(deleteCommentSuccess(commentObject, comment_id, currentUser_id));
    } catch (err) {
        console.log(err);
    }
}

const editCommentRequest = () => ({
    type: actionTypes.EDIT_COMMENT_REQUEST
});

const editCommentSuccess = (comment, comment_id) => ({
    type: actionTypes.EDIT_COMMENT_SUCCESS,
    payload: comment,
    key: comment_id
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
        const editCommentReq = await fetch(`${rootApiUrl}/api/comments/${comment_id}`, settings);
        if (!editCommentReq.ok) {
            return dispatch(editCommentFailed());
        }
        const updatedComment = await editCommentReq.json();
        updatedComment.author = updatedComment.author._id;
        dispatch(editCommentSuccess(updatedComment, updatedComment._id));
    } catch (err) {
        console.log(err);
    }
}