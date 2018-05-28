import { connect } from 'react-redux';
import SimpleCommentBlock from './SimpleCommentBlock';

const SimpleCommentBlockContainer = props => {
    const comment = props.comments[props._id]
    return <SimpleCommentBlock 
        commentText={comment.text}
        discussion_id={comment.discussion}
    />
};

const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(
    mapStateToProps
)(SimpleCommentBlockContainer)