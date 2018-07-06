import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import OwnComment from './OwnComment';

export class OwnCommentContainer extends Component {
    constructor(props) {
        super(props);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.boundReplyToComment = this.boundReplyToComment.bind(this);
        this.boundSubmitEditComment = this.boundSubmitEditComment.bind(this);
        this.state = {
            replyFormIsVisible: false,
            isEditing: false,
        };
    }

    toggleReplyForm() {
        this.setState({ replyFormIsVisible: !this.state.replyFormIsVisible });
    }

    toggleEditing() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleFieldUpdate(fieldname) {
        return (e) => {
            this.setState({ [fieldname]: e.target.value });
        }
    }

    handleEditSubmit(e) {
        e.preventDefault();
        const { commentEditorText } = this.state;
        this.props.editComment(commentEditorText, this.props.comment_id);
        this.setState({ isEditing: false });
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteComment(
            this.props.comment_id,
            this.props.currentUser_id
        );
    }

    boundReplyToComment(commentText) {
        this.props.replyToComment(commentText, this.props.comment_id)
        .then(() => this.toggleReplyForm());
    }

    boundSubmitEditComment(commentText) {
        this.props.editComment(commentText, this.props.comment_id)
        .then(() => this.toggleEditing());
    }

    render() {
        const comment = this.props.comments[this.props.comment_id];
        const author = this.props.users[comment.author];
        return <OwnComment 
            authorAvatar={author.avatar}
            author_id={author._id}
            authorUsername={author.username}
            comment_id={comment._id}
            commentParentsLength={comment.parents.length}
            commentCreatedAt={comment.createdAt}
            replyFormIsVisible={this.state.replyFormIsVisible}
            isEditing={this.state.isEditing}
            toggleReplyForm={this.toggleReplyForm}
            toggleEditing={this.toggleEditing}
            handleDelete={this.handleDelete}
            handleCommentEditorUpdate={this.handleFieldUpdate('commentEditorText')}
            boundReplyToComment={this.boundReplyToComment}
            boundSubmitEditComment={this.boundSubmitEditComment}
        />
    }
}

OwnCommentContainer.propTypes = {
    comment_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    comments: state.comments,
    users: state.users.models,
    currentUser_id: state.currentUser._id
});

export default connect(
    mapStateToProps,
    {
        deleteComment: ActionCreators.deleteComment,
        editComment: ActionCreators.editComment,
        replyToComment: ActionCreators.replyToComment
    }
)(OwnCommentContainer);
