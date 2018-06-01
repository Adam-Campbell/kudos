import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';

class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
        this.state = {
            replyFormIsVisible: false
        };
    }

    toggleReplyForm() {
        this.setState({ replyFormIsVisible: !this.state.replyFormIsVisible });
    }

    render() {
        const comment = this.props.comments[this.props._id];
        const author = this.props.users[comment.author];
        return <Comment 
            authorAvatar={author.avatar}
            author_id={author._id}
            authorUsername={author.username}
            commentParentsLength={comment.parents.length}
            commentCreatedAt={comment.createdAt}
            commentText={comment.text}
            comment_id={comment._id}
            isLoggedIn={this.props.isLoggedIn}
            toggleReplyForm={this.toggleReplyForm}
            replyFormIsVisible={this.state.replyFormIsVisible}

        />
    }
}

const mapStateToProps = state => ({
    comments: state.comments,
    users: state.users.models,
    isLoggedIn: state.currentUser.isLoggedIn
});

export default connect(mapStateToProps)(CommentContainer);