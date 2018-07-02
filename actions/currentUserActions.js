import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';
import { handleNormalize } from '../utils';
import { storeUsers, storePosts, storeHighlights } from './documentActions';


/*******************************
    Document storage actions
*******************************/

const storeCurrentUser = (currentUser, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USER,
    payload: currentUser,
    meta: {
        entityKey: currentUser_id
    }
});

const storeCurrentUsersHighlights = (highlightsResults, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USERS_HIGHLIGHTS,
    payload: {
        result: highlightsResults
    },
    meta: {
        entityKey: currentUser_id,
    }
});

const storeCurrentUsersFollows = (followsResult, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USERS_FOLLOWS,
    payload: {
        result: followsResult
    },
    meta: {
        entityKey: currentUser_id
    }
});

const storeCurrentUsersKudos = (kudosResult, currentUser_id) => ({
    type: actionTypes.STORE_CURRENT_USERS_KUDOS,
    payload: {
        result: kudosResult
    },
    meta: {
        entityKey: currentUser_id
    }
});

/***********************
    fetchCurrentUser
************************/

const fetchCurrentUserRequest = () => ({
    type: actionTypes.FETCH_CURRENT_USER_REQUEST
});

const fetchCurrentUserSuccess = (currentUser_id) => ({
    type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
    meta: {
        currentUser_id
    }
});

const fetchCurrentUserFailed = err => ({
    type: actionTypes.FETCH_CURRENT_USER_FAILED,
    payload: err
});

const fetchCurrentUsersInfo = settings => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/me`, settings);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        dispatch(storeCurrentUser(responseJSON, responseJSON._id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);  
    }
}

const fetchCurrentUsersHighlights = settings => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/me/highlights`, settings);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        const currentUser_id = responseJSON.user_id;
        const normalizedResponse = handleNormalize(responseJSON.highlights, 'highlights');
        dispatch(storeHighlights(normalizedResponse.entities.highlights));
        dispatch(storeCurrentUsersHighlights(normalizedResponse.result, currentUser_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

const fetchCurrentUsersFollows = settings => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/me/follows/`, settings);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        const currentUser_id = responseJSON.user_id;
        const normalizedResponse = handleNormalize(responseJSON.follows, 'users');
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storeCurrentUsersFollows(normalizedResponse.result, currentUser_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);  
    }
}

const fetchCurrentUsersKudos = settings => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/me/kudos`, settings);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        const currentUser_id = responseJSON.user_id;
        const normalizedResponse = handleNormalize(responseJSON.kudos, 'kudos');
        // The result array returned from the handleNormalize function is an array of the ids for
        // the Kudos entities themselves. However for the frontend all we want is an array of the
        // ids of the posts that Kudos was given to. So here we map over the array supplied to create
        // a new array of the details we actually want.
        const arrayOfPost_ids = normalizedResponse.result.map(kudos_id => {
            return normalizedResponse.entities.kudos[kudos_id].post
        });
        const timestamp = Date.now();
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeCurrentUsersKudos(arrayOfPost_ids, currentUser_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

export const fetchCurrentUser = token => async (dispatch, getState) => {
    dispatch(fetchCurrentUserRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const promiseArr = [
        dispatch(fetchCurrentUsersInfo(settings)),
        dispatch(fetchCurrentUsersHighlights(settings)),
        dispatch(fetchCurrentUsersFollows(settings)),
        dispatch(fetchCurrentUsersKudos(settings))
    ];

    return Promise.all(promiseArr)
    .then(() => {
        const currentUser_id = getState().currentUser._id;
        dispatch(fetchCurrentUserSuccess(currentUser_id));
    }, (err) => {
        dispatch(fetchCurrentUserFailed(err));
    });
}


/****************
    followUser
****************/


const followUserRequest = user_id => ({
    type:actionTypes.FOLLOW_USER_REQUEST,
    payload: user_id
});

const followUserSuccess = user_id => ({
    type: actionTypes.FOLLOW_USER_SUCCESS,
    payload: user_id
});

const followUserFailed = user_id => ({
    type: actionTypes.FOLLOW_USER_FAILED,
    payload: user_id
});

export const followUser = (user_id, token) => async dispatch => {
    dispatch(followUserRequest(user_id));
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT'
    };
    try {
        const followUserReq = await fetch(`${rootApiUrl}/api/me/follows/${user_id}`, settings);
        if (!followUserReq.ok) { 
            return dispatch(followUserFailed(user_id));
        }
        return dispatch(followUserSuccess(user_id));
        
    } catch (err) {
        console.log(err);
    }
}

/*******************
    unfollowUser
*******************/

const unfollowUserRequest = user_id => ({
    type: actionTypes.UNFOLLOW_USER_REQUEST,
    payload: user_id
});

const unfollowUserSuccess = user_id => ({
    type: actionTypes.UNFOLLOW_USER_SUCCESS,
    payload: user_id
});

const unfollowUserFailed = user_id => ({
    type: actionTypes.UNFOLLOW_USER_FAILED,
    payload: user_id
});

export const unfollowUser = (user_id, token) => async dispatch => {
    dispatch(unfollowUserRequest(user_id));
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    };
    try {
        const unfollowUserReq = await fetch(`${rootApiUrl}/api/me/follows/${user_id}`, settings);
        if (!unfollowUserReq.ok) { 
            return dispatch(unfollowUserFailed(user_id));
        }
        return dispatch(unfollowUserSuccess(user_id));
    } catch (err) {
        console.log(err);
    }
}

/***************
    giveKudos
***************/

const giveKudosRequest = post_id => ({
    type: actionTypes.GIVE_KUDOS_REQUEST,
    payload: post_id
});

const giveKudosSuccess = (post_id, currentUser_id) => ({
    type: actionTypes.GIVE_KUDOS_SUCCESS,
    payload: post_id,
    meta: {
        currentUser_id
    }
});

const giveKudosFailed = post_id => ({
    type: actionTypes.GIVE_KUDOS_FAILED,
    payload: post_id
});

export const giveKudos = (post_id, currentUser_id, token) => async dispatch => {
    dispatch(giveKudosRequest(post_id));
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT'
    };
    try {
        const giveKudos = await fetch(`${rootApiUrl}/api/me/kudos/${post_id}`, settings);
        if (!giveKudos.ok) {
            return dispatch(giveKudosFailed(post_id));
        }
        return dispatch(giveKudosSuccess(post_id, currentUser_id));
    } catch (err) {
        console.log(err);
    }
};

/*****************
    removeKudos
*****************/

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

const removeKudosFailed = post_id => ({
    type:actionTypes.REMOVE_KUDOS_FAILED,
    payload: post_id
});

export const removeKudos = (post_id, currentUser_id, token) => async dispatch => {
    dispatch(removeKudosRequest(post_id));
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    };
    try {
        const removeKudos = await fetch(`${rootApiUrl}/api/me/kudos/${post_id}`, settings);
        if (!removeKudos.ok) {
            return dispatch(removeKudosFailed(post_id));
        }
        return dispatch(removeKudosSuccess(post_id, currentUser_id));
    } catch (err) {
        console.log(err);
    }
};


/***********************
    updateUserDetails
************************/

const updateUserDetailsRequest = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_REQUEST
});

const updateUserDetailsSuccess = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_SUCCESS
});

const updateUserDetailsFailed = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_FAILED
});

export const updateUserDetails = (newDetails, currentUser_id, token) => async dispatch => {
    dispatch(updateUserDetailsRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            username: newDetails.username,
            email: newDetails.email,
            bio: newDetails.bio
        })
    };
    try {
        const response = await fetch(`${rootApiUrl}/api/me`, settings);
        if (!response.ok) {
            return dispatch(updateUserDetailsFailed());
        }
        const responseJSON = await response.json();
        dispatch(storeCurrentUser(responseJSON, currentUser_id));
        return dispatch(updateUserDetailsSuccess());
    } catch (err) {
        console.log(err);
    }
}

/**********************
    updateUserAvatar
***********************/

const updateUserAvatarRequest = () => ({
    type: actionTypes.UPDATE_USER_AVATAR_REQUEST
});

const updateUserAvatarSuccess = () => ({
    type: actionTypes.UPDATE_USER_AVATAR_SUCCESS
});

const updateUserAvatarFailed = () => ({
    type: actionTypes.UPDATE_USER_AVATAR_FAILED
});

export const updateUserAvatar = (formData, token) => async dispatch => {
    dispatch(updateUserAvatarRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: formData
    }
    try {
        const response = await fetch(`${rootApiUrl}/api/me/images`, settings);
        if (!response.ok) {
            return dispatch(updateUserAvatarFailed());
        }
        const responseJSON = await response.json();
        dispatch(storeCurrentUser(responseJSON, responseJSON._id));
        return dispatch(updateUserAvatarSuccess());
    } catch (err) {
        console.log(err);
    }
}

/************************
    updateUserPassword
************************/

const updateUserPasswordRequest = () => ({
    type: actionTypes.UPDATE_USER_PASSWORD_REQUEST
});

const updateUserPasswordSuccess = () => ({
    type: actionTypes.UPDATE_USER_PASSWORD_SUCCESS
});

const updateUserPasswordFailed = () => ({
    type: actionTypes.UPDATE_USER_PASSWORD_FAILED
});

export const updateUserPassword = (currentPw, newPw, token,) => async dispatch => {
    dispatch(updateUserPasswordRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            old: currentPw,
            new: newPw
        })
    }
    try {
        const response = await fetch(`${rootApiUrl}/api/me/password`, settings);
        if (!response.ok) {
            return dispatch(updateUserPasswordFailed());
        }
        return dispatch(updateUserPasswordSuccess());
    } catch (err) {
        console.log(err);
        dispatch(updateUserPasswordFailed());
    }
}