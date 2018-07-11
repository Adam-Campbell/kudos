import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import CommentEditor from '../CommentEditor';

class ArticleCommentBoxContainer extends Component {
    constructor(props) {
        super(props);
        this.boundSubmitHandler = this.boundSubmitHandler.bind(this);
    }

    boundSubmitHandler(commentData, clearFieldCallback) {
        this.props.replyToPost(commentData, this.props.article_id)
        .then(() => clearFieldCallback());
    }

    render() {
        return <CommentEditor 
            isCancellable={false}
            submitCallback={this.boundSubmitHandler}
        />
    }
}

ArticleCommentBoxContainer.propTypes = {
    article_id: PropTypes.string.isRequired
};

export default connect(
    null, 
    { replyToPost: ActionCreators.replyToPost }
)(ArticleCommentBoxContainer)