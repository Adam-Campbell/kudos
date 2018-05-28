import { fetchCurrentUser } from '../actions';
/*
Function will perform a check to see if the currentUser needs to be fetched. 

If yes, it will return the fetchCurrentUser function, which can be awaited on in the getInitialProps function 
that has called it. 

If not, then it just returns a resolved promise. So in either case you just await this function when you call it.

*/

export const fetchCurrentUserIfNeeded = (currentState, store) => {
    const { isLoggedIn, hasFetched, token } = currentState.currentUser;
    if (isLoggedIn && !hasFetched) {
        return store.dispatch(fetchCurrentUser(token));
    }
    return Promise.resolve();
};
