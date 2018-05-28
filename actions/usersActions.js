import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { handleNormalize } from '../utils';

const fetchUsersInfo = async _id => {
    try {
        const usersInfo = await fetch(`http://localhost:5000/api/users/${_id}`);
        if (!usersInfo.ok) {
            return Promise.reject();
        }
        const usersInfoJSON = await usersInfo.json();
        return usersInfoJSON;
    } catch (err) {
        return Promise.reject(err);
    }
};

const fetchUsersFollowers = async _id => {
    try {
        const usersFollowers = await fetch(`http://localhost:5000/api/users/${_id}/followers`);
        if (!usersFollowers.ok) {
            return Promise.reject();
        }
        const usersFollowersJSON = await usersFollowers.json(); 
        return usersFollowersJSON;
    } catch (err) {
        return Promise.reject(err);
    }
};

const fetchUsersPosts = async _id => {
    try {
        const usersPosts = await fetch(`http://localhost:5000/api/users/${_id}/posts`);
        if (!usersPosts.ok) {
            return Promise.reject();
        }
        const usersPostsJSON = await usersPosts.json();
        return handleNormalize(usersPostsJSON, 'posts');
    } catch (err) {
      return Promise.reject(err);  
    }
};

const fetchUsersComments = async _id => {
    try {
        const usersComments = await fetch(`http://localhost:5000/api/users/${_id}/comments`);
        if (!usersComments.ok) {
            return Promise.reject();
        }
        const usersCommentsJSON = await usersComments.json();
        return handleNormalize(usersCommentsJSON, 'comments');
    } catch (err) {
      return Promise.reject(err);  
    }
};

const fetchUsersKudos = async _id => {
    try {
        const usersKudos = await fetch(`http://localhost:5000/api/users/${_id}/kudos`);
        if (!usersKudos.ok) {
            return Promise.reject();
        }
        const usersKudosJSON = await usersKudos.json();
        const normalizedKudos = handleNormalize(usersKudosJSON, 'kudos');
        normalizedKudos.result = normalizedKudos.result.map(kudos_id => {
            return normalizedKudos.entities.kudos[kudos_id].post
        });
        return normalizedKudos;
    } catch (err) {
      return Promise.reject(err);  
    }
};

const fetchUsersHighlights = async _id => {
    try {
        const usersHighlights = await fetch(`http://localhost:5000/api/users/${_id}/highlights`);
        if (!usersHighlights.ok) {
            return Promise.reject();
        }
        const usersHighlightsJSON = await usersHighlights.json();
        return handleNormalize(usersHighlightsJSON, 'highlights');
    } catch (err) {
        return Promise.reject(err);  
    }
};

const checkIfFollowing = async (_id, token) => {
    //console.log(token);
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const isFollowing = await fetch(`http://localhost:5000/api/me/follows/${_id}`, settings);
        if (!isFollowing.ok) {
            return Promise.reject();
        }
        const isFollowingBool = await isFollowing.json();
        return isFollowingBool;
    } catch (err) {
        return Promise.reject(err);  
    }
};

const fetchUserRequest = () => ({
    type: actionTypes.FETCH_USER_REQUEST
});

const fetchUserSuccess = (_id, data) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    key: _id,
    payload: data
});

const fetchUserFailed = err => ({
    type: actionTypes.FETCH_USER_FAILED,
    payload: err
});


export const fetchUser = _id => async (dispatch, getState) => {
    dispatch(fetchUserRequest());
    try {
        const usersInfoReq = fetchUsersInfo(_id);
        const usersFollowersReq = fetchUsersFollowers(_id);
        const usersPostsReq = fetchUsersPosts(_id);
        const usersCommentsReq = fetchUsersComments(_id);
        const usersKudosReq = fetchUsersKudos(_id);
        const usersHighlightsReq = fetchUsersHighlights(_id);

        const usersInfo = await usersInfoReq;
        const usersFollowers = await usersFollowersReq;
        const usersPosts = await usersPostsReq;
        const usersComments = await usersCommentsReq;
        const usersKudos = await usersKudosReq;
        const usersHighlights = await usersHighlightsReq;

        const user = {
            ...usersInfo,
            ...usersFollowers,
            postIds: usersPosts.result,
            commentIds: usersComments.result,
            kudosIds: usersKudos.result,
            highlightIds: usersHighlights.result,
            isFullProfile: true,
            fetchedAt: Date.now()
        };

        const fetchUserResults = {
            user: user,
            posts: {
                ...usersPosts.entities.posts,
                ...usersKudos.entities.posts,
                ...usersHighlights.entities.posts
            },
            comments: {
                ...usersComments.entities.comments
            },
            users: {
                ...usersKudos.entities.users,
                ...usersHighlights.entities.users
            },
            highlights: {
                ...usersHighlights.entities.highlights
            }
        }
        dispatch(fetchUserSuccess(_id, fetchUserResults));
        
    } catch (err) {
        dispatch(fetchUserFailed(err));
    }
};


