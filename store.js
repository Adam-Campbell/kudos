import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;




const makeStore = (initialState, options) => {
    // This logic will grab the token cookie from the request if it exists,
    // and pass that as the initial state for the token reducer so it loads
    // on the client with that info already in place. 
    if (options.isServer && options.req.headers.cookie) {
        initialState = {
            // token: {
            //     token: options.req.headers.cookie.split('=')[1],
            //     isLoggedIn: true
            // },
            currentUser: {
                isLoggedIn: true,
                _id: '',
                token: options.req.headers.cookie.split('=')[1]
            }
        }
    }
    
    return createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
}

export default makeStore;