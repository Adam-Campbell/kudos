import makeStore from '../store';
import withRedux from 'next-redux-wrapper';
import SignInForm from '../components/SignInForm';
import Header from '../components/Header';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Router from 'next/router';
import { Wrapper } from '../components/Layout';

// const signin = props => (
//     <React.Fragment>
//         <NavBar />
//         <SignInForm />
//     </React.Fragment>
// );

const signin = props => {
    if (!props.isLoggedIn) {
        return (
            <React.Fragment>
                <Header />
                <Wrapper tight>
                    <SignInForm />
                </Wrapper>
            </React.Fragment>
        )
    } else if (!props.hasFetched) {
        return null;
    } else {
        return <p style={{color: 'red', backgroundColor: 'yellow'}}>You shouldn't be here!!!</p>;
    }
}

signin.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    hasFetched: state.currentUser.hasFetched
});

export default withRedux(
    makeStore,
    mapStateToProps
)(signin);