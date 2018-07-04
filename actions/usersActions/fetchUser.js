import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants'; 
import {
    storeUser,
    storeUsers,
    storeUsersPosts,
    storeUsersFollowers,
    storeUsersComments,
    storeUsersKudos,
    storeUsersHighlights,
    storePosts,
    storeComments,
    storeHighlights,
} from '../documentActions';
import { fetchData, handleNormalize } from '../../utils';
import { tokenExpired } from '../authActions';

const fetchUsersInfo = user_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/users/${user_id}`);
        dispatch(storeUser(response, user_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
};

const fetchUsersFollowers = user_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/users/${user_id}/followers`);
        dispatch(storeUsersFollowers(response, user_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
};

const fetchUsersPosts = user_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/users/${user_id}/posts`);
        const normalizedResponse = handleNormalize(response, 'posts');
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsersPosts(normalizedResponse.result, user_id));
        return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);  
    }
};

const fetchUsersComments = user_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/users/${user_id}/comments`);
        const normalizedResponse = handleNormalize(response, 'comments');
        dispatch(storeComments(normalizedResponse.entities.comments));
        dispatch(storeUsersComments(normalizedResponse.result, user_id));
        return Promise.resolve()
    } catch (err) {
      return Promise.reject(err);  
    }
};

const fetchUsersKudos = user_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/users/${user_id}/kudos`);
        const normalizedResponse = handleNormalize(response, 'kudos');
        const arrayOfPost_ids = normalizedResponse.result.map(kudos_id => {
            return normalizedResponse.entities.kudos[kudos_id].post
        });
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storeUsersKudos(arrayOfPost_ids, user_ids));
        return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);  
    }
};

const fetchUsersHighlights = user_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/users/${user_id}/highlights`);
        const normalizedResponse = handleNormalize(response, 'highlights');
        dispatch(storeHighlights(normalizedResponse.entities.highlights));
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storeUsersHighlights(normalizedResponse.result, user_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);  
    }
};

const fetchUserRequest = () => ({
    type: actionTypes.FETCH_USER_REQUEST
});

const fetchUserSuccess = (user_id, timestamp) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    meta: {
        user_id,
        timestamp
    }
});

const fetchUserFailed = (error) => ({
    type: actionTypes.FETCH_USER_FAILED,
    error
});

export const fetchUser = user_id => async dispatch => {
    dispatch(fetchUserRequest());
    const promiseArr = [
        dispatch(fetchUsersInfo(user_id)),
        dispatch(fetchUsersFollowers(user_id)),
        dispatch(fetchUsersPosts(user_id)),
        dispatch(fetchUsersComments(user_id)),
        dispatch(fetchUsersKudos(user_id)),
        dispatch(fetchUsersHighlights(user_id))
    ];

    return Promise.all(promiseArr)
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchUserSuccess(user_id, timestamp))
    }, (err) => {
        console.log(err);
        dispatch(fetchUserFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    });
}
