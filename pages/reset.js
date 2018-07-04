import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded } from '../utils';
import Header from '../components/Header';
import PasswordResetForm from '../components/PasswordResetForm';

const reset = props => (
    <React.Fragment>
        <Header />
        <PasswordResetForm resetPasswordToken={props.resetPasswordToken} />
    </React.Fragment>
);

reset.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    await fetchCurrentUserIfNeeded(currentState, store);
    return {
        resetPasswordToken: query.resetPasswordToken
    };
};

export default withRedux(makeStore)(reset);