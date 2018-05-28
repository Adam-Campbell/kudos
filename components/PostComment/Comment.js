import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Link from 'next/link';
import CommentReplyForm from './CommentReplyForm';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleReplySubmit = this.handleReplySubmit.bind(this);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
        this.state = {
            replyFormIsVisible: false,
        };
    }

    handleFieldUpdate(fieldName, value) {
        this.setState({ [fieldName]: value });
    }

    toggleReplyForm() {
        this.setState({ replyFormIsVisible: !this.state.replyFormIsVisible });
    }

    handleReplySubmit(e) {
        e.preventDefault();
    }

    render() {
        const comment = this.props.comments[this.props._id];
        return (
            <div style={{marginLeft: `${(comment.parents.length - 1) * 25}px`}}>
                <Link as={`/user/${comment.author_id}`} href={`/user?user=${comment.author_id}`}>
                    <a>{comment.authorUsername}</a>
                </Link>
                <p>{comment.text}</p>
                <span>{comment.createdAt}</span> 
                <button onClick={this.toggleReplyForm}>Reply</button>
                {
                    this.state.replyFormIsVisible && 
                    <CommentReplyForm 
                        comment_id={this.props._id}
                        closeForm={this.toggleReplyForm}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = state => ({
    comments: state.comments,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token
});

export default connect(mapStateToProps, {})(Comment);