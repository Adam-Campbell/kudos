import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostComment from './PostComment';
import CommentReplyForm from './CommentReplyForm';
import * as ActionCreators from '../../actions';
import DeletedComment from './DeletedComment';
import OwnComment from './OwnComment';
import Comment from './Comment';

// const PostCommentContainer = props => {
//     const comment = props.comments[props._id];
//     const author = props.users[comment.author];
//     return <PostComment 
//         depth={comment.parents.length-1}
//         author_id={author._id}
//         authorUsername={author.username}
//         text={comment.text}
//         createdAt={comment.createdAt}
//     />
// };

const InProgress = props => {
    const comment = props.comments[props._id];
    const isAuthor = props.currentUser_id === comment.author;
    if (isAuthor) {
        return <OwnComment _id={props._id}/>
    } else if (!comment.author) {
        return <DeletedComment /> 
    } else {
        return <Comment _id={props._id}/>
    }
}

// class PostCommentContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.toggleForm = this.toggleForm.bind(this);
//         this.state = {
//             formIsVisible: false
//         };
//     }

//     toggleForm() {
//         this.setState({ formIsVisible: !this.state.formIsVisible });
//     }

//     render() {
//         const comment = this.props.comments[this.props._id];
//         if (comment.author) {
//             const author = this.props.users[comment.author];
//             return (
//                 <PostComment 
//                     depth={comment.parents.length-1}
//                     author_id={author._id}
//                     authorUsername={author.username}
//                     text={comment.text}
//                     createdAt={comment.createdAt}
//                     isLoggedIn={this.props.isLoggedIn}
//                     toggleForm={this.toggleForm}
//                     currentUser_id={this.props.currentUser_id}
//                     deleteComment={this.props.deleteComment}
//                     _id={this.props._id}
//                     token={this.props.token}
//                 >
//                     {
//                         this.props.isLoggedIn && this.state.formIsVisible &&
//                         <CommentReplyForm 
//                             comment_id={this.props._id}
//                             closeForm={this.toggleForm}
//                         />
//                     }
//                 </PostComment>
//         );
//         } else {
//             return <DeletedComment />
//         }
//     }
// }

// const mapStateToProps = state => ({
//     comments: state.comments,
//     users: state.users.models,
//     isLoggedIn: state.currentUser.isLoggedIn,
//     currentUser_id: state.currentUser._id,
//     token: state.currentUser.token
// });

const mapStateToProps = state => ({
    comments: state.comments,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(InProgress);

// export default connect(
//     mapStateToProps,
//     {
//         deleteComment: ActionCreators.deleteComment
//     }
// )(PostCommentContainer);
