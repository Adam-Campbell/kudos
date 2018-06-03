import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from './Article';

const ArticleContainer = props => {
    const article = props.articles[props.article_id];
    const isAuthor = props.currentUser_id === article.author;
    return <Article 
        article_id={article._id}
        articleTitle={article.title}
        articleDescription={article.description}
        articleImage={article.image}
        articleText={article.text}
        articleKudos={article.kudos}
        commentIds={article.commentIds}
        isLoggedIn={props.isLoggedIn}
        isAuthor={isAuthor}
    />
};

ArticleContainer.propTypes = {
    article_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    articles: state.posts.models,
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(ArticleContainer);