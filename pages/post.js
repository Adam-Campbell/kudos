import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { injectGlobal } from 'styled-components';
import NavBar from '../components/NavBar';
import FullPost from '../components/FullPost';
import { fetchPost, fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, fetchPostIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import PostCommentCollection from '../components/PostCommentCollection';
import Link from 'next/link';
import CommentForm from '../components/CommentForm';
import Article from '../components/Article';
import Header from '../components/Header';

const post = props => {

    const currentPost = props.posts[props._id];
    const isAuthor = props.isLoggedIn && currentPost.author === props.currentUser_id ? true : false;

    return (
        <React.Fragment>
            <Header />
            <Article _id={props._id} />
        </React.Fragment>  
    );
};

post.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store);
    const post = fetchPostIfNeeded(currentState, store, query.post);
    await Promise.all([currentUser, post]);
    return {
        _id: query.post
    }
}

const mapStateToProps = state => ({
    posts: state.posts.models,
    currentUser_id: state.currentUser._id,
    isLoggedIn: state.currentUser.isLoggedIn
});

export default withRedux(makeStore, mapStateToProps)(post);