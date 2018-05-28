import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import Header from '../components/Header';
import UserDetailsForm from '../components/UserDetailsForm';
import UserImageUploadForm from '../components/UserImageUploadForm';
import UserPasswordForm from '../components/UserPasswordForm';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Router from 'next/router';

/*
On this page you will be able to edit:

Username - http://localhost:5000/api/me  -- PUT
Email    - http://localhost:5000/api/me  -- PUT
Bio      - http://localhost:5000/api/me  -- PUT
Avatar   - http://localhost:5000/api/me/images   -- PUT
Password - http://localhost:5000/api/me/password   -- PUT

For now, just create a seperate form for each of these, as I want to be able to send them independently.
Later it might be better to create one form, which looks at which parts the user has actually updated and
dispatches the appropriate actions. 

*/

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
    cleanseErrorsAndSuccesses(store);
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
}

// accountDetails.getInitialProps = async ({store, isServer, req, pathname, query}) => {
//     const currentState = store.getState();
//     if (currentState.currentUser.isLoggedIn && !currentState.currentUser.hasFetched) {
//         await store.dispatch(fetchCurrentUser(currentState.currentUser.token));
//     }
//     return;
// }

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn
});

export default withRedux(makeStore, mapStateToProps)(accountDetails);