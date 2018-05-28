import * as actionTypes from '../actionTypes';

const initialState = {
    passwordResetEmailSent: false
};

const successesReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PASSWORD_RESET_EMAIL_SENT_REGISTER:
            return {
                ...state,
                passwordResetEmailSent: true
            };

        case actionTypes.PASSWORD_RESET_EMAIL_SENT_ACKNOWLEDGE:
            return {
                ...state,
                passwordResetEmailSent: false
            };

        case actionTypes.CLEANSE_SUCCESSES:
            return initialState;

        default:
            return state;
    }
}

export default successesReducer;