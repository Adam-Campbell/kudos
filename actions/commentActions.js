import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';  
import { sortComments } from '../utils';
import { storeComment } from './documentActions';
import { fetchData } from '../utils';
import { tokenExpired } from './authActions';

/*****************
    replyToPost
*****************/

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
        // if (!response.ok) {
        //     return dispatch(replyToPostFailed());
        // }
        // const responseJSON = await response.json();

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
        dispatch(replyToPostFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
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

const replyToCommentFailed = (error) => ({
    type: actionTypes.REPLY_TO_COMMENT_FAILED,
    error
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
        const response = await fetchData(`${rootApiUrl}/api/comments/${parentComment_id}`, settings);
        // if (!response.ok) {
        //     return dispatch(replyToCommentFailed());
        // }
        // const responseJSON = await response.json();

        // We need to re-sort the comments before handing them back to the reducer, this ensures the commment we
        // just added appears in the right place. 
        const currentState = getState();
        const parentPost_id = response.discussion;
        const existingComments = currentState.posts.models[parentPost_id].commentIds.map(comment_id => {
            return currentState.comments[comment_id]
        });
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
        dispatch(replyToCommentSuccess());
    } catch (err) {
        dispatch(replyToCommentFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
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
        // if (!response.ok) {
        //     return dispatch(deleteCommentFailed());
        // }
        // const responseJSON = await response.json();

        dispatch(deleteCommentSuccess(response, comment_id, currentUser_id));
    } catch (err) {
        dispatch(deleteCommentFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
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
        // if (!response.ok) {
        //     return dispatch(editCommentFailed());
        // }
        // const responseJSON = await response.json();
        response.author = response.author._id;
        dispatch(editCommentSuccess(response, response._id));
    } catch (err) {
        dispatch(editCommentFailed());
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}