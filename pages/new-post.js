import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Header from '../components/Header';
import NewPostForm from '../components/NewPostForm';
import Router from 'next/router';

// const newPost = props => (
//     <React.Fragment>
//         <NavBar />
//         {props.isLoggedIn ? <NewPostForm /> : <p>Sorry, you have to be logged in to view this page.</p>}
//     </React.Fragment>
// );

const newPost = props => {
    if (props.isLoggedIn) {
        return (
            <React.Fragment>
                <Header />
                <NewPostForm />
            </React.Fragment>
        )
    } else {
        if (typeof window !== 'undefined') { Router.push('/signin'); }
        return null;
    }
}

newPost.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn
});

export default withRedux(makeStore, mapStateToProps)(newPost);