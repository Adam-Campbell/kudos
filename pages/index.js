import makeStore from '../store';
import withRedux from 'next-redux-wrapper';
import { fetchPosts, fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, fetchPostsIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import JumboArticleCard from '../components/JumboArticleCard';
import Header from '../components/Header';
import { Wrapper, Column } from '../components/Layout';

const index = props => (
    <React.Fragment>
        <Header />
        <Wrapper flex regular>
            {
                props.posts.map((post, index) => (
                    <Column key={index}>
                        <JumboArticleCard _id={post} key={index}/>  
                    </Column>
                ))
            }
        </Wrapper>
    </React.Fragment>
)

index.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store);
    const posts = fetchPostsIfNeeded(currentState, store, 'all');
    await Promise.all([currentUser, posts]);
    return {};
};

const mapStateToProps = state => ({
    posts: state.categories.all.postIds
});

export default withRedux(
    makeStore, 
    mapStateToProps,
    { fetchPosts }
)(index);
