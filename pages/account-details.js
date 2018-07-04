import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import Header from '../components/Header';
import UserDetailsForm from '../components/UserDetailsForm';
import UserImageUploadForm from '../components/UserImageUploadForm';
import UserPasswordForm from '../components/UserPasswordForm';
import { fetchCurrentUserIfNeeded } from '../utils';
import Router from 'next/router';

const accountDetails = props => {
    if (props.isLoggedIn) {
        return (
            <React.Fragment>
                <Header />
                <UserDetailsForm />
                <UserImageUploadForm />
                <UserPasswordForm />
            </React.Fragment>
        )
    } else {
        if (typeof window !== 'undefined') { Router.push('/'); }
        return null;
    }
}

accountDetails.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
}

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn
});

export default withRedux(makeStore, mapStateToProps)(accountDetails);
