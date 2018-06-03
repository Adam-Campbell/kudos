import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorBlock from './AuthorBlock';

const AuthorBlockContainer = props => {
    const article = props.articles[props.article_id];
    const author = props.users[article.author];
    return <AuthorBlock 
        author_id={author._id}
        authorAvatar={author.avatar}
        authorUsername={author.username}
        authorBio={author.bio}
    />
};

AuthorBlockContainer.propTypes = {
    article_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    articles: state.posts.models,
    users: state.users.models
});

export default connect(mapStateToProps)(AuthorBlockContainer);