import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleArticleBlock from './SimpleArticleBlock';

export const SimpleArticleBlockContainer = props => {
    const article = props.articles[props.article_id];
    return <SimpleArticleBlock 
        articleTitle={article.title}
        articleDescription={article.description}
        article_id={article._id}
    />
};

SimpleArticleBlockContainer.propTypes = {
    article_id: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(
    mapStateToProps
)(SimpleArticleBlockContainer);