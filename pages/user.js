import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import NavBar from '../components/NavBar';
import { fetchUser, fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, fetchUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import UserDetails from '../components/UserDetails';
import UserSubNav from '../components/UserSubNav';
import { Wrapper } from '../components/Layout';
import Header from '../components/Header';
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileFeed from '../components/UserProfileFeed';

const user = props => (
    <React.Fragment>
        <Header />
        <Wrapper tight>
            <UserProfileHeader _id={props._id} />
            <UserProfileFeed filter={props.filter} user_id={props._id} />
        </Wrapper>
    </React.Fragment>
);

user.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store);
    const user = fetchUserIfNeeded(currentState, store, query.user);
    await Promise.all([currentUser, user]);
    return {
        _id: query.user,
        filter: query.filter
    };
}

export default withRedux(makeStore)(user);