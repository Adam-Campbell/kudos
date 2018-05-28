import { connect } from 'react-redux';
import JumboArticleCard from './JumboArticleCard';

const JumboArticleCardContainer = props => {
    const article = props.articles[props._id];
    const author = props.users[article.author];

    return <JumboArticleCard 
        _id={article._id}
        articleImage={article.image}
        articleCategory={article.category}
        articleTitle={article.title}
        articleDescription={article.description}
        authorUsername={author.username}
        author_id={author._id}
        authorAvatar={author.avatar}
    />
}

const mapStateToProps = state => ({
    articles: state.posts.models,
    users: state.users.models
});

export default connect(mapStateToProps)(JumboArticleCardContainer);