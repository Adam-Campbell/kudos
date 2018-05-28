import { connect } from 'react-redux';
import InlineArticleCard from './InlineArticleCard';

const InlineArticleCardContainer = props => {
    const article = props.articles[props._id];
    const author = props.users[article.author];
    return <InlineArticleCard 
        _id={article._id}
        articleImage={article.image}
        articleTitle={article.title}
        authorUsername={author.username}
        author_id={author._id}
    />
};

const mapStateToProps = state => ({
    articles: state.posts.models,
    users: state.users.models
});

export default connect(mapStateToProps)(InlineArticleCardContainer);