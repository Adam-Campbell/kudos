import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from './Article';

class ArticleContainer extends Component {

    static propTypes = {
        articles: PropTypes.object.isRequired,
        article_id: PropTypes.string.isRequired,
        isAuthor: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        const article = this.props.articles[this.props.article_id];
        return (
            <Article 
                article_id={article._id}
                author_id={article.author}
                articleKudos={article.kudos}
                isInline={article.isInline}
                isAuthor={this.props.isAuthor}
                isLoggedIn={this.props.isLoggedIn}
                commentIds={article.commentIds}
            />
        );
    }
}

const mapStateToProps = state => ({
    articles: state.posts.models,
    isLoggedIn: state.currentUser.isLoggedIn
});

export default connect(mapStateToProps)(ArticleContainer);