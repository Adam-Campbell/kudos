import { fetchUser } from '../actions';

export const fetchUserIfNeeded = (currentState, store, user_id) => {
    const user = currentState.users.models[user_id];
    if (!user || !user.isFullProfile || user.fetchedAt + 120000 < Date.now()) {
        return store.dispatch(fetchUser(user_id));
    }
    return Promise.resolve();
};