import * as actionTypes from '../actionTypes';

const initialState = {
    emailNotFound: false
};

const errorsReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.EMAIL_NOT_FOUND_ERROR_REGISTER:
            return {
                ...state, 
                emailNotFound: true
            };

        case actionTypes.EMAIL_NOT_FOUND_ERROR_ACKNOWLEDGE:
            return {
                ...state,
                emailNotFound: false
            };

        case actionTypes.CLEANSE_ERRORS:
            return initialState;

        default: 
            return state;
    }
}

export default errorsReducer;