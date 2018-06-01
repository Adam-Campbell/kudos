import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import OwnComment from './OwnComment';

class OwnCommentContainer extends Component {
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
        this.props.editComment(commentEditorText, this.props._id, this.props.token);
        this.setState({ isEditing: false });
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteComment(
            this.props._id,
            this.props.currentUser_id,
            this.props.token
        );
    }

    boundReplyToComment(commentText) {
        this.props.replyToComment(commentText, this.props._id, this.props.token);
    }

    boundSubmitEditComment(commentText) {
        this.props.editComment(commentText, this.props._id, this.props.token);
        this.toggleEditing();
    }

    render() {
        const comment = this.props.comments[this.props._id];
        const author = this.props.users[comment.author];
        return <OwnComment 
            authorAvatar={author.avatar}
            author_id={author._id}
            authorUsername={author.username}
            comment_id={comment._id}
            commentParentsLength={comment.parents.length}
            commentCreatedAt={comment.createdAt}
            commentText={comment.text}
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

const mapStateToProps = state => ({
    comments: state.comments,
    users: state.users.models,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token
});

export default connect(
    mapStateToProps,
    {
        deleteComment: ActionCreators.deleteComment,
        editComment: ActionCreators.editComment,
        replyToComment: ActionCreators.replyToComment
    }
)(OwnCommentContainer);
















// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as ActionCreators from '../../actions';
// import OwnComment from './OwnComment';

// class OwnCommentContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.toggleReplyForm = this.toggleReplyForm.bind(this);
//         this.toggleEditing = this.toggleEditing.bind(this);
//         this.cancelEdit = this.cancelEdit.bind(this);
//         this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
//         this.handleEditSubmit = this.handleEditSubmit.bind(this);
//         this.handleDelete = this.handleDelete.bind(this);
//         this.boundReplyToComment = this.boundReplyToComment.bind(this);
//         this.state = {
//             replyFormIsVisible: false,
//             isEditing: false,
//             commentEditorText: this.props.comments[this.props._id].text
//         };
//     }

//     toggleReplyForm() {
//         this.setState({ replyFormIsVisible: !this.state.replyFormIsVisible });
//     }

//     toggleEditing() {
//         this.setState({ isEditing: !this.state.isEditing });
//     }

//     cancelEdit() {
//         this.setState({
//             isEditing: false,
//             commentEditorText: this.props.comments[this.props._id].text
//         });
//     }

//     handleFieldUpdate(fieldname) {
//         return (e) => {
//             this.setState({ [fieldname]: e.target.value });
//         }
//     }

//     handleEditSubmit(e) {
//         e.preventDefault();
//         const { commentEditorText } = this.state;
//         this.props.editComment(commentEditorText, this.props._id, this.props.token);
//         this.setState({ isEditing: false });
//     }

//     handleDelete(e) {
//         e.preventDefault();
//         this.props.deleteComment(
//             this.props._id,
//             this.props.currentUser_id,
//             this.props.token
//         );
//     }

//     boundReplyToComment(commentText) {
//         this.props.replyToComment(commentText, this.props._id, this.props.token);
//     }

//     boundSubmitEditComment(commentText) {
//         this.props.editComment()
//     }

//     render() {
//         const comment = this.props.comments[this.props._id];
//         const author = this.props.users[comment.author];
//         return <OwnComment 
//             authorAvatar={author.avatar}
//             author_id={author._id}
//             authorUsername={author.username}
//             comment_id={comment._id}
//             commentParentsLength={comment.parents.length}
//             commentCreatedAt={comment.createdAt}
//             commentText={comment.text}
//             replyFormIsVisible={this.state.replyFormIsVisible}
//             isEditing={this.state.isEditing}
//             commentEditorText={this.state.commentEditorText}
//             toggleReplyForm={this.toggleReplyForm}
//             toggleEditing={this.toggleEditing}
//             handleDelete={this.handleDelete}
//             handleCommentEditorUpdate={this.handleFieldUpdate('commentEditorText')}
//             cancelEdit={this.cancelEdit}
//             handleEditSubmit={this.handleEditSubmit}
//             boundReplyToComment={this.boundReplyToComment}
//         />
//     }
// }

// const mapStateToProps = state => ({
//     comments: state.comments,
//     users: state.users.models,
//     currentUser_id: state.currentUser._id,
//     token: state.currentUser.token
// });

// export default connect(
//     mapStateToProps,
//     {
//         deleteComment: ActionCreators.deleteComment,
//         editComment: ActionCreators.editComment,
//         replyToComment: ActionCreators.replyToComment
//     }
// )(OwnCommentContainer);