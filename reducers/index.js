import { combineReducers } from 'redux';
import posts from './postsReducer';
import users from './usersReducer';
import comments from './commentsReducer';
import kudos from './kudosReducer';
import highlights from './highlightsReducer';
import token from './tokenReducer';
import currentUser from './currentUserReducer';
import categories from './categoriesReducer';

export default combineReducers({
    posts,
    users,
    comments,
    highlights,
    currentUser,
    categories
});