import * as actionTypes from '../actionTypes';

/*
These actions are generic actions used to add documents / entities into the store. 
Generally they will not be called directly but are called by the more complex actions
once they have retreived the data that they will add to the store.
*/

export const storeUser = (user, user_id) => ({
    type: actionTypes.STORE_USER,
    payload: user,
    meta: {
        user_id
    }
});

export const storeUsersPosts = (post_ids, user_id) => ({
    type: actionTypes.STORE_USERS_POSTS,
    payload: post_ids,
    meta: {
        user_id
    }
});

export const storeUsersFollowers = (followers, user_id) => ({
    type: actionTypes.STORE_USERS_FOLLOWERS,
    payload: followers,
    meta: {
        user_id
    }
});

export const storeUsersComments = (comment_ids, user_id) => ({
    type: actionTypes.STORE_USERS_COMMENTS,
    payload: comment_ids,
    meta: {
        user_id
    }
});

export const storeUsersKudos = (post_ids, user_id) => ({
    type: actionTypes.STORE_USERS_KUDOS,
    payload: post_ids,
    meta: {
        user_id
    }
});

export const storeUsersHighlights = (highlight_ids, user_id) => ({
    type: actionTypes.STORE_USERS_HIGHLIGHTS,
    payload: highlight_ids,
    meta: {
        user_id
    }
});

export const storeUsers = (users) => ({
    type: actionTypes.STORE_USERS,
    payload: users
});

export const storePosts = (posts) => ({
    type: actionTypes.STORE_POSTS,
    payload: posts
});

export const storeComments = (comments) => ({
    type: actionTypes.STORE_COMMENTS,
    payload: comments
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

export const storePost = (post, post_id) => ({
    type: actionTypes.STORE_POST,
    payload: post,
    meta: {
        post_id
    }
});

export const storePostsComment_ids = (comment_ids, post_id) => {
    console.log(comment_ids);
    return {
        type: actionTypes.STORE_POSTS_COMMENT_IDS,
        payload: comment_ids,
        meta: {
            post_id
        }
    }
};

export const storePostsKudos = (kudos, post_id) => ({
    type: actionTypes.STORE_POSTS_KUDOS,
    payload: kudos,
    meta: {
        post_id
    }
});

export const updateIdsForCategory = (post_ids, category='all', timestamp) => ({
    type: actionTypes.UPDATE_IDS_FOR_CATEGORY,
    payload: post_ids,
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
        sortedComments
    },
    meta: {
        discussion_id,
        author_id
    }
});

export const storeCurrentUser = (currentUser, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USER,
    payload: currentUser,
    meta: {
        entityKey: currentUser_id
    }
});

export const storeCurrentUsersHighlights = (highlightsResults, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USERS_HIGHLIGHTS,
    payload: {
        result: highlightsResults
    },
    meta: {
        entityKey: currentUser_id,
    }
});

export const storeCurrentUsersFollows = (followsResult, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USERS_FOLLOWS,
    payload: {
        result: followsResult
    },
    meta: {
        entityKey: currentUser_id
    }
});

export const storeCurrentUsersKudos = (kudosResult, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USERS_KUDOS,
    payload: {
        result: kudosResult
    },
    meta: {
        entityKey: currentUser_id
    }
});
