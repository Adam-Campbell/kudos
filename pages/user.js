import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchUser, fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, fetchUserIfNeeded, retrieveAuthTokensOnSSR } from '../utils';
import { Wrapper } from '../components/Layout';
import Header from '../components/Header';
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileFeed from '../components/UserProfileFeed';

const user = props => (
    <React.Fragment>
        <Header />
        <Wrapper tight>
            <UserProfileHeader user_id={props.user_id} />
            <UserProfileFeed filter={props.filter} user_id={props.user_id} />
        </Wrapper>
    </React.Fragment>
);

user.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    const { token, refreshToken } = retrieveAuthTokensOnSSR(isServer, req);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store, token, refreshToken);
    const user = fetchUserIfNeeded(currentState, store, query.user);
    await Promise.all([currentUser, user]);
    return {
        user_id: query.user,
        filter: query.filter || 'posts'
    };
}

export default withRedux(makeStore)(user);
