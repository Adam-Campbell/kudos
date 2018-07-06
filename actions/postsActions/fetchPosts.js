import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { handleNormalize, fetchData } from '../../utils';
import { storePosts, storeUsers, updateIdsForCategory } from '../documentActions';

const fetchPostsRequest = () => ({
    type: actionTypes.FETCH_POSTS_REQUEST
});

const fetchPostsSuccess = () => ({
    type: actionTypes.FETCH_POSTS_SUCCESS
});

const fetchPostsFailed = error => ({
    type: actionTypes.FETCH_POSTS_FAILED,
    error
});

export const fetchPosts = () => async dispatch => {
    dispatch(fetchPostsRequest());
    const settings = { credentials: 'include' };
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts`, settings);
        const normalizedResponse = handleNormalize(response, 'posts');
        const timestamp = Date.now();
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(updateIdsForCategory(normalizedResponse.result, 'all', timestamp));
        dispatch(fetchPostsSuccess());
    } catch (err) {
        console.log(err);
        dispatch(fetchPostsFailed(err));
    }
}
