import * as actionTypes from '../actionTypes';

export const emailNotFoundErrorRegister = () => ({
    type: actionTypes.EMAIL_NOT_FOUND_ERROR_REGISTER
});

export const emailNotFoundErrorAcknowledge = () => ({
    type: actionTypes.EMAIL_NOT_FOUND_ERROR_ACKNOWLEDGE
});

export const cleanseErrors = () => ({
    type: actionTypes.CLEANSE_ERRORS
});