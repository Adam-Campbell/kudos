import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InlineArticleCard from './InlineArticleCard';

const InlineArticleCardContainer = props => {
    const article = props.articles[props.article_id];
    const author = props.users[article.author];
    return <InlineArticleCard 
        article_id={article._id}
        articleImage={article.image}
        articleTitle={article.title}
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