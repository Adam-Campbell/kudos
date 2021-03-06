import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InlineArticleCard from './InlineArticleCard';

export const InlineArticleCardContainer = props => {
    const article = props.articles[props.article_id];
    const author = props.users[article.author];
    const articleImage = article.image.original.imageUrl;
    return <InlineArticleCard 
        article_id={article._id}
        articleImage={articleImage}
        articleTitle={article.titleText}
        authorUsername={author.username}
        author_id={author._id}
    />
};

InlineArticleCardContainer.propTypes = {
    article_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    articles: state.posts.models,
    users: state.users.models
});

export default connect(mapStateToProps)(InlineArticleCardContainer);