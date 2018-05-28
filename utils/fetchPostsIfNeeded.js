import { fetchPosts, fetchCategoriesPosts } from '../actions';

export const fetchPostsIfNeeded = (currentState, store, categoryName) => {
    const { fetchedAt } = currentState.categories[categoryName];
    if ((fetchedAt === null && fetchedAt !== undefined) || fetchedAt + 120000 < Date.now()) {
        if (categoryName === 'all') {
            return store.dispatch(fetchPosts());
        }
        return store.dispatch(fetchCategoriesPosts(categoryName));
    }
    return Promise.resolve();
};