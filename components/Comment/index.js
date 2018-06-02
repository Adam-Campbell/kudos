import { connect } from 'react-redux';
import DeletedComment from './DeletedComment';
import CommentContainer from './CommentContainer';
import OwnCommentContainer from './OwnCommentContainer';

const CommentSelector = props => {
    const comment = props.comments[props._id];
    const isAuthor = (props.isLoggedIn && comment.author === props.currentUser_id);
    if (isAuthor) {
        return  <OwnCommentContainer _id={props._id} />
    } else if (!comment.author) {
        return <DeletedComment commentParentsLength={comment.parents.length} />
    } else {
        return <CommentContainer _id={props._id} />
    }
};

const mapStateToProps = state => ({
    comments: state.comments,
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(CommentSelector);