import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser, fetchPost } from '../actions';
import { fetchCurrentUserIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import Header from '../components/Header';
import EditPostForm from '../components/EditPostForm';
import Router from 'next/router';

// const editPost = props => {

//     const currentPost = props.posts[props.post_id];
//     const isAuthor = currentPost.author === props.currentUser_id;

//     return (
//         <React.Fragment>
//             <NavBar />
//             {
//                 props.isLoggedIn && isAuthor ? 
//                 <EditPostForm post_id={props.post_id} /> : 
//                 <p>Sorry, you do not have permission to edit this post.</p>
//             }
//         </React.Fragment>
//     );
// };

const editPost = props => {

    const currentPost = props.posts[props.post_id];
    const isAuthor = currentPost.author === props.currentUser_id;

    if (isAuthor) {
        return <React.Fragment>
                    <Header />
                    <EditPostForm post_id={props.post_id} />
            </React.Fragment>
    } else {
        {typeof window !== 'undefined' && Router.push(`/post?post=${props.post_id}`, `/post/${props.post_id}`)}
        return null;
    }

    return (
        <React.Fragment>
            <NavBar />
            {
                props.isLoggedIn && isAuthor ? 
                <EditPostForm post_id={props.post_id} /> : 
                <p>Sorry, you do not have permission to edit this post.</p>
            }
        </React.Fragment>
    );
};

editPost.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store);
    const post = store.dispatch(fetchPost(query.post));
    await Promise.all([currentUser, post]);
    return {
        post_id: query.post
    };
};

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id,
    posts: state.posts.models
});

export default withRedux(makeStore, mapStateToProps)(editPost);