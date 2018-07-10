import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser, cleanseErrors } from '../actions';
import { fetchCurrentUserIfNeeded, retrieveAuthTokensOnSSR } from '../utils';
import Header from '../components/Header';
import PasswordResetEmailReqForm from '../components/PasswordResetEmailReqForm';

const forgot = props => (
    <React.Fragment>
        <Header />
        <PasswordResetEmailReqForm />
    </React.Fragment>
);

forgot.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    const { token, refreshToken } = retrieveAuthTokensOnSSR(isServer, req);
    await fetchCurrentUserIfNeeded(currentState, store, token, refreshToken);
    return;
};

export default withRedux(makeStore)(forgot);