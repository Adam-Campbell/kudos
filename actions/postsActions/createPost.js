import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import Router from 'next/router';
import { storePost } from '../documentActions';
import { tokenExpired } from '../authActions';

const createPostRequest = () => ({
    type: actionTypes.CREATE_POST_REQUEST
});

const createPostSuccess = (post_id, category, currentUser_id) => ({
    type: actionTypes.CREATE_POST_SUCCESS,
    meta: {
        post_id,
        category,
        currentUser_id
    }
});

const createPostFailed = (error) => ({
    type: actionTypes.CREATE_POST_FAILED,
    error
});

export const createPost = (articleObject, currentUser_id) => async dispatch => {
    dispatch(createPostRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'post',
        body: JSON.stringify(articleObject)
    }
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts`, settings);
        const newPost_id = response._id;
        const newPostCategory = response.category;
        dispatch(storePost(response, newPost_id));
        dispatch(createPostSuccess(newPost_id, newPostCategory, currentUser_id));
        Router.push(`/post?post=${newPost_id}`, `/post/${newPost_id}`);
    } catch (err) {
        dispatch(createPostFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}