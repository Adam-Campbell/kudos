import * as actionTypes from '../actionTypes';

const initialState = {
    isLoggedIn: false,
    _id: '',
    token: '',
    email: '',
    follows: [],
    hasFetched: false,
    signUpDuplicateError: false,
};

const currentUserReducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true
            }

        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
                signUpDuplicateError: false
            }

        case actionTypes.SIGN_UP_FAILED:
            return {
                ...state,
                signUpDuplicateError: true
            }

        case actionTypes.FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                hasFetched: true
            }

        case actionTypes.SIGN_OUT_SUCCESS:
            return initialState;

        case actionTypes.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                follows: [...state.follows, action.payload]
            }

        case actionTypes.UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                follows: state.follows.filter(follow => follow !== action.payload)
            }

        // case actionTypes.UPDATE_USER_DETAILS_SUCCESS:
        //     return {
        //         ...state,
        //         email: action.payload.email
        //     };

        case actionTypes.STORE_CURRENT_USER:
            return {
                ...state,
                _id: action.payload._id,
                email: action.payload.email
            }

        case actionTypes.STORE_CURRENT_USERS_FOLLOWS:
            return {
                ...state,
                follows: action.payload.result
            }

        default:
            return state;
    }
};

export default currentUserReducer;