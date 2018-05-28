import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Link from 'next/link';
import CommentReplyForm from './CommentReplyForm';

class OwnComment extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.toggleReplyForm = this.toggleReplyForm.bind(this);
        this.state = {
            isEditing: false,
            replyFormIsVisible: false,
            commentText: this.props.comments[this.props._id].text
        };
    }

    handleFieldUpdate(fieldName, value) {
        this.setState({ [fieldName]: value });
    }

    toggleEditing() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    toggleReplyForm() {
        this.setState({ replyFormIsVisible: !this.state.replyFormIsVisible });
    }

    handleEditSubmit(e) {
        const { commentText } = this.state;
        e.preventDefault();
        this.props.editComment(commentText, this.props._id, this.props.token);
        this.setState({ isEditing: false });
    }

    render() {
        const comment = this.props.comments[this.props._id];
        return (
            <div style={{marginLeft: `${comment.depth * 25}px`}}>
                <Link as={`/user/${comment.author_id}`} href={`/user?user=${comment.author_id}`}>
                    <a>{comment.authorUsername}</a>
                </Link>
                {
                    this.state.isEditing ? (
                        <React.Fragment>
                            <textarea 
                                value={this.state.commentText} 
                                onChange={e => this.handleFieldUpdate('commentText', e.target.value)}
                            ></textarea> 
                            <button onClick={this.handleEditSubmit}>Save</button>
                        </React.Fragment>
                    ) : 
                    <p>{this.state.commentText}</p>
                }
                <span>{comment.createdAt}</span> 
                <button onClick={this.toggleEditing}>{this.state.isEditing ? 'Cancel' : 'Edit'}</button>
                <button 
                    onClick={() => this.props.deleteComment(
                                this.props._id, 
                                this.props.currentUser_id, 
                                this.props.token
                            )}
                >Delete</button>
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

export default connect(
    mapStateToProps, 
    {
        deleteComment: ActionCreators.deleteComment,
        editComment: ActionCreators.editComment
    }
)(OwnComment);