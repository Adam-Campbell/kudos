import makeStore from '../store';
import withRedux from 'next-redux-wrapper';
import { fetchPosts, fetchCurrentUser } from '../actions';
import { fetchCurrentUserIfNeeded, fetchPostsIfNeeded } from '../utils';
import JumboArticleCard from '../components/JumboArticleCard';
import Header from '../components/Header';
import { Wrapper, Column } from '../components/Layout';

const index = props => (
    <React.Fragment>
        <Header />
        <Wrapper flex regular>
            {
                props.articles.map((article_id, index) => (
                    <Column key={index}>
                        <JumboArticleCard article_id={article_id} key={index}/>  
                    </Column>
                ))
            }
        </Wrapper>
    </React.Fragment>
)

index.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    //console.log(req.cookies);
    const currentState = store.getState();
    let token = null;
    if (isServer && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    const currentUser = fetchCurrentUserIfNeeded(currentState, store, token);
    const posts = fetchPostsIfNeeded(currentState, store, 'all');
    // const currentUser = store.dispatch(fetchCurrentUser(token));
    // const posts = store.dispatch(fetchPosts());
    await Promise.all([currentUser, posts]);
    return {};
};

const mapStateToProps = state => ({
    articles: state.categories.all.postIds
});

export default withRedux(
    makeStore, 
    mapStateToProps,
    { fetchPosts }
)(index);
