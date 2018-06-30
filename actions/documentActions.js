import * as actionTypes from '../actionTypes';

/*
These actions are generic actions used to add documents / entities into the store. 
Generally they will not be called directly but are called by the more complex actions
once they have retreived the data that they will add to the store.
*/


export const storeUsers = (users) => ({
    type: actionTypes.STORE_USERS,
    payload: users
});

export const storePosts = (posts, timestamp) => ({
    type: actionTypes.STORE_POSTS,
    payload: posts,
    meta: {
        timestamp
    }
});

export const storePostsForCategory = (posts, post_ids, category, timestamp) => ({
    type: actionTypes.STORE_POSTS_FOR_CATEGORY,
    payload: {
        posts,
        post_ids
    },
    meta: {
        category,
        timestamp
    }
});

export const storeHighlights = (highlights) => ({
    type: actionTypes.STORE_HIGHLIGHTS,
    payload: highlights
});

export const storeComment = (comment, comment_id, discussion_id, author_id, sortedComments) => ({
    type: actionTypes.STORE_COMMENT,
    payload: {
        comment,
        comment_id,
        sortedCommentsArray
    },
    meta: {
        discussion_id,
        author_id
    }
});