import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Header from '../components/Header';
import NewPostForm from '../components/NewPostForm';
import Router from 'next/router';
import ArticleEditor from '../components/ArticleEditor';
import ArticleTitleEditor from '../components/ArticleEditor/ArticleTitleEditor';
import ArticleDescriptionEditor from '../components/ArticleEditor/ArticleDescriptionEditor';
import ArticleEditorStateContainer from '../components/ArticleEditor/ArticleEditorStateContainer';
import TitleAndDescription from '../components/ArticleEditor/TitleAndDescription';

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
                <ArticleEditorStateContainer isNewArticle={true} />
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
