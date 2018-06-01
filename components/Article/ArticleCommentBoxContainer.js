import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import CommentEditor from '../CommentEditor';

class ArticleCommentBoxContainer extends Component {
    constructor(props) {
        super(props);
        this.boundSubmitHandler = this.boundSubmitHandler.bind(this);
    }

    boundSubmitHandler(commentData) {
        this.props.replyToPost(commentData, this.props.article_id, this.props.token);
    }

    render() {
        return <CommentEditor 
            isCancellable={false}
            submitCallback={this.boundSubmitHandler}
        />
    }
}

const mapStateToProps = state => ({
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    { replyToPost: ActionCreators.replyToPost }
)(ArticleCommentBoxContainer)