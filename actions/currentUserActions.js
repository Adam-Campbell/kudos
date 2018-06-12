import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';
import { handleNormalize } from '../utils';

const fetchCurrentUserRequest = () => ({
    type: actionTypes.FETCH_CURRENT_USER_REQUEST
});

const fetchCurrentUserSuccess = (_id, userData, userEmail, userFollows, users, posts, highlights) => ({
    type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
    payload: {
        currentUser: userData,
        email: userEmail,
        follows: userFollows,
        users: users,
        posts: posts,
        highlights: highlights
    },
    key: _id
});

const fetchCurrentUserFailed = err => ({
    type: actionTypes.FETCH_CURRENT_USER_FAILED,
    payload: err
});

const fetchCurrentUsersProfile = async (settings) => {
    try {
        const currentUsersProfile = await fetch(`${rootApiUrl}/api/me`, settings);
        if (!currentUsersProfile.ok) {
            return Promise.reject();
        }
        const currentUsersProfileJSON = await currentUsersProfile.json();
        return currentUsersProfileJSON;
    } catch (err) {
        return Promise.reject(err);  
    }
}

const fetchCurrentUsersFollows = async (settings) => {
    try {
        const currentUsersFollows = await fetch(`${rootApiUrl}/api/me/follows/`, settings);
        if (!currentUsersFollows.ok) {
            return Promise.reject();
        }
        const currentUsersFollowsJSON = await currentUsersFollows.json();
        return handleNormalize(currentUsersFollowsJSON, 'users');
    } catch (err) {
        return Promise.reject(err);  
    }
}

const fetchCurrentUsersKudos = async (settings) => {
    try {
        const currentUsersKudos = await fetch(`${rootApiUrl}/api/me/kudos`, settings);
        if (!currentUsersKudos.ok) {
            return Promise.reject();
        }
        const currentUsersKudosJSON = await currentUsersKudos.json();
        const normalizedKudos = handleNormalize(currentUsersKudosJSON, 'kudos');
        normalizedKudos.result = normalizedKudos.result.map(kudos_id => {
            return normalizedKudos.entities.kudos[kudos_id].post
        });
        return normalizedKudos;
    } catch (err) {
        return Promise.reject(err);
    }
}

const fetchCurrentUsersHighlights = async (settings) => {
    try {
        const currentUsersHighlights = await fetch(`${rootApiUrl}/api/me/highlights`, settings);
        if (!currentUsersHighlights.ok) {
            return Promise.reject();
        }
        const currentUsersHighlightsJSON = await currentUsersHighlights.json();
        return handleNormalize(currentUsersHighlightsJSON, 'highlights');
    } catch (err) {
        return Promise.reject(err);
    }
}

export const fetchCurrentUser = token => async dispatch => {
    dispatch(fetchCurrentUserRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const currentUserReq = fetchCurrentUsersProfile(settings);
        const currentUsersFollowsReq = fetchCurrentUsersFollows(settings);
        const currentUsersKudosReq = fetchCurrentUsersKudos(settings);
        const currentUsersHighlightsReq = fetchCurrentUsersHighlights(settings);

        const currentUser = await currentUserReq;
        const currentUsersFollows = await currentUsersFollowsReq;
        const currentUsersKudos = await currentUsersKudosReq;
        const currentUsersHighlights = await currentUsersHighlightsReq;
        
        const currentUserObject = { 
            ...currentUser,
            kudosIds: currentUsersKudos.result,
            highlightIds: currentUsersHighlights.result
        };
        const currentUser_id = currentUserObject._id;
        const currentUserEmail = currentUserObject.email;
        const users = {
            ...currentUsersFollows.entities.users,
            ...currentUsersKudos.entities.users,
            ...currentUsersHighlights.entities.users
        };
        const posts = {
            ...currentUsersKudos.entities.posts,
            ...currentUsersHighlights.entities.posts
        };
        const highlights = {
            ...currentUsersHighlights.entities.highlights
        };
        delete currentUserObject.email;
        
        dispatch(fetchCurrentUserSuccess(
            currentUser_id, 
            currentUserObject, 
            currentUserEmail,
            currentUsersFollows.result,
            users,
            posts,
            highlights
        ));
    } catch (err) {
        dispatch(fetchCurrentUserFailed(err));
    }
}  

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



const giveKudosRequest = post_id => ({
    type: actionTypes.GIVE_KUDOS_REQUEST,
    payload: post_id
});

const giveKudosSuccess = (post_id, currentUser_id) => ({
    type: actionTypes.GIVE_KUDOS_SUCCESS,
    payload: post_id,
    key: currentUser_id
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


const removeKudosRequest = post_id => ({
    type:actionTypes.REMOVE_KUDOS_REQUEST,
    payload: post_id
});

const removeKudosSuccess = (post_id, currentUser_id) => ({
    type:actionTypes.REMOVE_KUDOS_SUCCESS,
    payload: post_id,
    key: currentUser_id
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

const updateUserDetailsRequest = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_REQUEST
});

const updateUserDetailsSuccess = (newUserDetails, userEmail, _id) => ({
    type: actionTypes.UPDATE_USER_DETAILS_SUCCESS,
    payload: {
        currentUser: newUserDetails,
        email: userEmail
    },
    key: _id
});

const updateUserDetailsFailed = () => ({
    type: actionTypes.UPDATE_USER_DETAILS_FAILED
});

export const updateUserDetails = (newDetails, _id, token) => async dispatch => {
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
        const updateUserDetailsReq = await fetch(`${rootApiUrl}/api/me`, settings);
        if (!updateUserDetailsReq.ok) {
            return dispatch(updateUserDetailsFailed());
        }
        const newUserDetails = await updateUserDetailsReq.json();
        const newUserObject = { ...newUserDetails };
        const email = newUserDetails.email;
        delete newUserObject.email;
        return dispatch(updateUserDetailsSuccess(newUserObject, email, _id));
    } catch (err) {
        console.log(err);
    }
}

const updateUserAvatarRequest = () => ({
    type: actionTypes.UPDATE_USER_AVATAR_REQUEST
});

const updateUserAvatarSuccess = (newUserDetails, _id) => ({
    type: actionTypes.UPDATE_USER_AVATAR_SUCCESS,
    payload: newUserDetails,
    key: _id
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
        const updateAvatarRequest = await fetch(`${rootApiUrl}/api/me/images`, settings);
        if (!updateAvatarRequest.ok) {
            return dispatch(updateUserAvatarFailed());
        }
        const newUserDetails = await updateAvatarRequest.json();
        return dispatch(updateUserAvatarSuccess(newUserDetails, newUserDetails._id));
    } catch (err) {
        console.log(err);
    }
}


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
        const updatePasswordReq = await fetch(`${rootApiUrl}/api/me/password`, settings);
        if (!updatePasswordReq.ok) {
            return dispatch(updateUserPasswordFailed());
        }
        return dispatch(updateUserPasswordSuccess());
    } catch (err) {
        console.log(err);
        dispatch(updateUserPasswordFailed());
    }
}