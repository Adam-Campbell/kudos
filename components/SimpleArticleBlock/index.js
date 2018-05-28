import { connect } from 'react-redux';
import SimpleArticleBlock from './SimpleArticleBlock';

const SimpleArticleBlockContainer = props => {
    const article = props.articles[props._id];
    return <SimpleArticleBlock 
        articleTitle={article.title}
        articleDescription={article.description}
        article_id={article._id}
    />
};

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(
    mapStateToProps
)(SimpleArticleBlockContainer);