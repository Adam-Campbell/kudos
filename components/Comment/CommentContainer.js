import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import Comment from './Comment';

class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
        this.boundReplyToComment = this.boundReplyToComment.bind(this);
        this.state = {
            replyFormIsVisible: false
        };
    }

    boundReplyToComment(commentText) {
        this.props.replyToComment(commentText, this.props.comment_id, this.props.token);
    }

    toggleReplyForm() {
        this.setState({ replyFormIsVisible: !this.state.replyFormIsVisible });
    }

    render() {
        const comment = this.props.comments[this.props.comment_id];
        const author = this.props.users[comment.author];
        return <Comment 
            authorAvatar={author.avatar}
            author_id={author._id}
            authorUsername={author.username}
            commentParentsLength={comment.parents.length}
            commentCreatedAt={comment.createdAt}
            comment_id={comment._id}
            isLoggedIn={this.props.isLoggedIn}
            toggleReplyForm={this.toggleReplyForm}
            replyFormIsVisible={this.state.replyFormIsVisible}
            boundReplyToComment={this.boundReplyToComment}
        />
    }
}

CommentContainer.propTypes = {
    comment_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    comments: state.comments,
    users: state.users.models,
    isLoggedIn: state.currentUser.isLoggedIn,
    token: state.currentUser.token
});

export default connect(
    mapStateToProps,
    {
        replyToComment: ActionCreators.replyToComment
    }
)(CommentContainer);