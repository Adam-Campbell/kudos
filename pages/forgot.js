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
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

export default withRedux(makeStore)(forgot);