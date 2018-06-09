import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleCommentBlock from './SimpleCommentBlock';

export const SimpleCommentBlockContainer = props => {
    const comment = props.comments[props.comment_id]
    return <SimpleCommentBlock 
        comment_id={props.comment_id}
        discussion_id={comment.discussion}
    />
};

SimpleCommentBlockContainer.propTypes = {
    comment_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(
    mapStateToProps
)(SimpleCommentBlockContainer)