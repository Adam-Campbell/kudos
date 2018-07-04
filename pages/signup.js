import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import SignUpForm from '../components/SignUpForm';
import { fetchCurrentUserIfNeeded } from '../utils';
import Router from 'next/router';
import Header from '../components/Header';

const signup = props => {
    if (!props.isLoggedIn) {
        return (
            <React.Fragment>
                <Header />
                <SignUpForm />
            </React.Fragment>
        );
    } else if (!props.hasFetched) {
        return null;
    } else {
        return <p style={{color: 'red', backgroundColor: 'yellow'}}>You shouldn't be here!!!</p>;
    }
}

signup.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    hasFetched: state.currentUser.hasFetched
});

export default withRedux(makeStore, mapStateToProps)(signup);
