import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { fetchData } from '../../utils';
import Router from 'next/router';
import { storePost } from '../documentActions';
import { tokenExpired } from '../authActions';

const updateCategoryPostIds = (oldCategory, newCategory, post_id) => ({
    type: actionTypes.UPDATE_CATEGORY_POST_IDS,
    meta: {
        oldCategory,
        newCategory,
        post_id
    }
});


const editPostRequest = () => ({
    type: actionTypes.EDIT_POST_REQUEST
});

const editPostSuccess = () => ({
    type: actionTypes.EDIT_POST_SUCCESS
});

const editPostFailed = (error) => ({
    type: actionTypes.EDIT_POST_FAILED,
    error
});



export const editPost = (articleObject, post_id, oldCategory, newCategory) => async dispatch => {
    dispatch(editPostRequest());
    const settings = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(articleObject)
    }
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts/${post_id}`, settings);
        response.author = response.author._id;
        dispatch(storePost(response, post_id));
        if (oldCategory !== newCategory) {
            dispatch(updateCategoryPostIds(oldCategory, newCategory, post_id));
        }
        dispatch(editPostSuccess());
        Router.push(`/post?post=${post_id}`, `/post/${post_id}/`);
    } catch (err) {
        dispatch(editPostFailed(err));
        if (err.status && err.status === 401) {
            dispatch(tokenExpired());
        }
    }
}