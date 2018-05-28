import { connect } from 'react-redux';
import Article from './Article';

const ArticleContainer = props => {
    const article = props.articles[props._id];
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

const mapStateToProps = state => ({
    articles: state.posts.models,
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(ArticleContainer);