import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { handleNormalize } from '../../utils';
import { 
    storeUsers, 
    storePosts, 
    storeHighlights,
    storeCurrentUser,
    storeCurrentUsersHighlights,
    storeCurrentUsersFollows,
    storeCurrentUsersKudos
 } from '../documentActions';
import { fetchData } from '../../utils';
import { tokenExpired } from '../authActions';

const fetchCurrentUserRequest = () => ({
    type: actionTypes.FETCH_CURRENT_USER_REQUEST
});

const fetchCurrentUserSuccess = (currentUser_id) => ({
    type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
    meta: {
        currentUser_id
    }
});

const fetchCurrentUserFailed = (error) => ({
    type: actionTypes.FETCH_CURRENT_USER_FAILED,
    error
});

const fetchCurrentUsersInfo = (settings) => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/me`, settings);
        dispatch(storeCurrentUser(response, response._id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);  
    }
}

const fetchCurrentUsersHighlights = (settings) => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/highlights`, settings);
        const currentUser_id = response.user_id;
        const normalizedResponse = handleNormalize(response.highlights, 'highlights');
        dispatch(storeHighlights(normalizedResponse.entities.highlights));
        dispatch(storeCurrentUsersHighlights(normalizedResponse.result, currentUser_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

const fetchCurrentUsersFollows = (settings) => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/follows/`, settings);
        const currentUser_id = response.user_id;
        const normalizedResponse = handleNormalize(response.follows, 'users');
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storeCurrentUsersFollows(normalizedResponse.result, currentUser_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);  
    }
}

const fetchCurrentUsersKudos = (settings) => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/me/kudos`, settings);
        const currentUser_id = response.user_id;
        const normalizedResponse = handleNormalize(response.kudos, 'kudos');
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

export const fetchCurrentUser = (SSRToken) => async (dispatch, getState) => {
    dispatch(fetchCurrentUserRequest());
    const settings = {
        headers: {
            
        },
        credentials: 'include'
    };
    if (SSRToken) {
        settings.headers.Cookie = `token=${SSRToken}`;
    }
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
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    });
}
