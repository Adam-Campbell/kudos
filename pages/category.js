import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import { fetchCurrentUser, cleanseErrors, fetchCategoriesPosts } from '../actions';
import { fetchCurrentUserIfNeeded, fetchPostsIfNeeded, cleanseErrorsAndSuccesses } from '../utils';
import NavBar from '../components/NavBar';
import PostBlock from '../components/PostBlock';
import Header from '../components/Header';
import InlineArticleCard from '../components/InlineArticleCard';
import { Wrapper } from '../components/Layout';

const category = props => (
    <React.Fragment>
        <Header />
        <Wrapper flex regular>   
            {props.categories[props.category].postIds.map((post_id, index) => (
                <InlineArticleCard _id={post_id} key={index} />
            ))}
        </Wrapper>
    </React.Fragment>
);

category.getInitialProps = async ({store, isServer, req, pathname, query}) => {
    const currentState = store.getState();
    cleanseErrorsAndSuccesses(store);
    const currentUser = fetchCurrentUserIfNeeded(currentState, store);
    const categoriesPosts = fetchPostsIfNeeded(currentState, store, query.category);
    //const categoriesPosts = store.dispatch(fetchCategoriesPosts(query.category));
    await Promise.all([currentUser, categoriesPosts]);
    return {
        category: query.category
    };
};

// category.getInitialProps = async ({store, isServer, req, pathname, query}) => {
//     const currentState = store.getState();
//     if (currentState.currentUser.isLoggedIn && !currentState.currentUser.hasFetched) {
//         await store.dispatch(fetchCurrentUser(currentState.currentUser.token));
//     }
//     store.dispatch(cleanseErrors());
//     await store.dispatch(fetchCategoriesPosts(query.category));
//     return {
//         category: query.category
//     };
// };

// category.getInitialProps = ({query}) => ({
//     category: query.category,
// });

const mapStateToProps = state => ({
    categories: state.categories
});

export default withRedux(makeStore, mapStateToProps)(category);