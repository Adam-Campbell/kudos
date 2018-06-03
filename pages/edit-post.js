import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser, fetchPost } from '../actions';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Header from '../components/Header';
import EditArticleForm from '../components/EditArticleForm';
import Router from 'next/router';

const editPost = props => {
    const currentArticle = props.articles[props.article_id];
    const isAuthor = currentArticle.author === props.currentUser_id;
    
    if (isAuthor) {
        return <React.Fragment>
                    <Header />
                    <EditArticleForm article_id={props.article_id} />
            </React.Fragment>
    } else {
        if (typeof window !== 'undefined') {
            Router.push(`/post?post=${props.article_id}`, `/post/${props.article_id}`);
        }
        return null;
    }
};

editPost.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store);
    const post = store.dispatch(fetchPost(query.post));
    await Promise.all([currentUser, post]);
    return {
        article_id: query.post
    };
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id,
    articles: state.posts.models
});

export default withRedux(makeStore, mapStateToProps)(editPost);