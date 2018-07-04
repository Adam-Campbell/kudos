import { createStore, compose, applyMiddleware } from 'redux';
import * as actionTypes from './actionTypes';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Router from 'next/router';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const handleExpiredToken = store => next => action => {
    //console.log(`The ${action.type} action was called`);
    if (action.type === actionTypes.TOKEN_EXPIRED && typeof window !== 'undefined') {
        Router.push('/signin');
    } else {
        return next(action);
    }
}

const makeStore = (initialState, options) => {
    // This logic will grab the token cookie from the request if it exists,
    // and pass that as the initial state for the token reducer so it loads
    // on the client with that info already in place. 
    if (options.isServer && options.req.headers.cookie) {
        initialState = {
            currentUser: {
                isLoggedIn: true,
                _id: '',
                token: options.req.headers.cookie.split('=')[1],
                email: '',
                follows: [],
                hasFetched: false,
                signUpDuplicateError: false
            }
        }
    }
    
    return createStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, handleExpiredToken)
        )
    );
}

export default makeStore;
