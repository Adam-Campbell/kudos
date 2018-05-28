import { cleanseErrors, cleanseSuccesses } from '../actions';

export const cleanseErrorsAndSuccesses = (store) => {
    store.dispatch(cleanseErrors());
    store.dispatch(cleanseSuccesses());
};
