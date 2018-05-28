import { connect } from 'react-redux';
import Comment from './Comment';

const CommentContainer = props => {
    const comment = props.comments[props._id];
    return <Comment 
        discussion_id={comment.discussion}
        text={comment.text}
    />
};

const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(mapStateToProps)(CommentContainer);

