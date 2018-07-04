import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded } from '../utils';
import Header from '../components/Header';
import NewPostForm from '../components/NewPostForm';
import Router from 'next/router';
import ArticleEditor from '../components/ArticleEditor';

// const newPost = props => {
//     if (props.isLoggedIn) {
//         return (
//             <React.Fragment>
//                 <Header />
//                 <NewPostForm />
//             </React.Fragment>
//         )
//     } else {
//         if (typeof window !== 'undefined') { Router.push('/signin'); }
//         return null;
//     }
// }

const newPost = props => {
    if (props.isLoggedIn) {
        return (
            <React.Fragment>
                <Header />
                <ArticleEditor isNewArticle={true} />
            </React.Fragment>
        )
    } else {
        if (typeof window !== 'undefined') { Router.push('/signin'); }
        return null;
    }
}

newPost.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    await fetchCurrentUserIfNeeded(currentState, store);
    return;
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn
});

export default withRedux(makeStore, mapStateToProps)(newPost);
