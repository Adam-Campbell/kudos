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
    let token = null;
    if (isServer && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    await fetchCurrentUserIfNeeded(currentState, store, token);
    return {
        resetPasswordToken: query.resetPasswordToken
    };
};

export default withRedux(makeStore)(reset);