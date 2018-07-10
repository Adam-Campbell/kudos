import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, retrieveAuthTokensOnSSR } from '../utils';
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
    const { token, refreshToken } = retrieveAuthTokensOnSSR(isServer, req);
    await fetchCurrentUserIfNeeded(currentState, store, token, refreshToken);
    return {
        resetPasswordToken: query.resetPasswordToken
    };
};

export default withRedux(makeStore)(reset);