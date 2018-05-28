import * as actionTypes from '../actionTypes';

const initialState = {
    token: '',
    isLoggedIn: false
};

const tokenReducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.SIGN_IN_SUCCESS:
            return {
                token: action.payload,
                isLoggedIn: true
            }

        default:
            return state;
    }
}

export default tokenReducer;