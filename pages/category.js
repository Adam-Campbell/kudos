import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser, cleanseErrors, fetchCategoriesPosts } from '../actions';
import { fetchCurrentUserIfNeeded, fetchPostsIfNeeded, retrieveAuthTokensOnSSR } from '../utils';
import Header from '../components/Header';
import InlineArticleCard from '../components/InlineArticleCard';
import { Wrapper } from '../components/Layout';

const category = props => (
    <React.Fragment>
        <Header />
        <Wrapper flex regular>   
            {props.categories[props.category].postIds.map((post_id, index) => (
                <InlineArticleCard article_id={post_id} key={index} />
            ))}
        </Wrapper>
    </React.Fragment>
);

category.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    const { token, refreshToken } = retrieveAuthTokensOnSSR(isServer, req);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store, token, refreshToken);
    const categoriesPosts = fetchPostsIfNeeded(currentState, store, query.category);
    await Promise.all([currentUser, categoriesPosts]);
    return {
        category: query.category
    };
};

const mapStateToProps = state => ({
    categories: state.categories
});

export default withRedux(makeStore, mapStateToProps)(category);
