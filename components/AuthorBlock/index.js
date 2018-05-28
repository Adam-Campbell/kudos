import { connect } from 'react-redux';
import AuthorBlock from './AuthorBlock';

const AuthorBlockContainer = props => {
    const article = props.articles[props._id];
    const author = props.users[article.author];
    return <AuthorBlock 
        author_id={author._id}
        authorAvatar={author.avatar}
        authorUsername={author.username}
        authorBio={author.bio}
    />
};

const mapStateToProps = state => ({
    articles: state.posts.models,
    users: state.users.models
});

export default connect(mapStateToProps)(AuthorBlockContainer);