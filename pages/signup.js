import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import NavBar from '../components/NavBar';
import SignUpForm from '../components/SignUpForm';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Router from 'next/router';
import Header from '../components/Header';

// const signup = props => (
//     <React.Fragment>
//         <NavBar />
//         <SignUpForm />
//     </React.Fragment>
// )

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
    cleanseErrorsAndSuccesses(store);
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    hasFetched: state.currentUser.hasFetched
});

export default withRedux(makeStore, mapStateToProps)(signup);

