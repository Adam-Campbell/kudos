import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeletedComment from './DeletedComment';
import CommentContainer from './CommentContainer';
import OwnCommentContainer from './OwnCommentContainer';

export const CommentSelector = props => {
    const comment = props.comments[props.comment_id];
    const isAuthor = (props.isLoggedIn && comment.author === props.currentUser_id);
    if (isAuthor) {
        return  <OwnCommentContainer comment_id={props.comment_id} />
    } else if (!comment.author) {
        return <DeletedComment commentParentsLength={comment.parents.length} />
    } else {
        return <CommentContainer comment_id={props.comment_id} />
    }
};

CommentSelector.propTypes = {
    comment_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    comments: state.comments,
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(CommentSelector);