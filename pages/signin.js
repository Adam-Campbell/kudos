import makeStore from '../store';
import withRedux from 'next-redux-wrapper';
import SignInForm from '../components/SignInForm';
import Header from '../components/Header';
import { fetchCurrentUserIfNeeded } from '../utils';
import Router from 'next/router';
import { Wrapper } from '../components/Layout';

const signin = props => {
    return (
        <React.Fragment>
            <Header />
            <Wrapper tight>
                <SignInForm />
            </Wrapper>
        </React.Fragment>
    );
}

// const signin = props => {
//     if (!props.isLoggedIn) {
//         return (
//             <React.Fragment>
//                 <Header />
//                 <Wrapper tight>
//                     <SignInForm />
//                 </Wrapper>
//             </React.Fragment>
//         )
//     } else if (!props.hasFetched) {
//         return null;
//     } else {
//         return <p style={{color: 'red', backgroundColor: 'yellow'}}>You shouldn't be here!!!</p>;
//     }
// }

signin.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    let token = null;
    if (isServer && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    await fetchCurrentUserIfNeeded(currentState, store, token);
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
