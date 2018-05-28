import { fetchPost } from '../actions';

export const fetchPostIfNeeded = (currentState, store, post_id) => {
    const post = currentState.posts.models[post_id];
    if (!post || !post.isFullPost || post.fetchedAt + 120000 < Date.now()) {
        return store.dispatch(fetchPost(post_id));
    }
    return Promise.resolve();
};