import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser, cleanseErrors } from '../actions';
import { fetchCurrentUserIfNeeded } from '../utils';
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
    let token = null;
    if (isServer && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    await fetchCurrentUserIfNeeded(currentState, store, token);
    return;
};

export default withRedux(makeStore)(forgot);