import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { handleNormalize, fetchData } from '../../utils';
import { 
    storePosts, 
    storeUsers, 
    updateIdsForCategory,
    storePostsForCategory
} from '../documentActions';

const fetchCategoriesPostsRequest = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_REQUEST
});

const fetchCategoriesPostsSuccess = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS
});

const fetchCategoriesPostsFailed = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_FAILED
});

export const fetchCategoriesPosts = category => async dispatch => {
    dispatch(fetchCategoriesPostsRequest());
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts?category=${category}`);
        const normalizedResponse = handleNormalize(response, 'posts');
        const timestamp = Date.now();
        dispatch(
            storePostsForCategory(
                normalizedResponse.entities.posts,
                normalizedResponse.result,
                category,
                timestamp
            )
        );
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(updateIdsForCategory(normalizedResponse.result, category, timestamp,));
        dispatch(fetchCategoriesPostsSuccess());
    } catch (err) {
        dispatch(fetchCategoriesPostsFailed());
    }
} 