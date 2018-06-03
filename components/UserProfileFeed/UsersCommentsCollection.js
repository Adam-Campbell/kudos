import PropTypes from 'prop-types';
import SimpleCommentBlock from '../SimpleCommentBlock';

const UsersCommentsCollection = props => (
    <div>
        {props.comment_ids.map((comment_id, index) => (
            <SimpleCommentBlock comment_id={comment_id} key={index} />
        ))}
    </div>
);

UsersCommentsCollection.propTypes = {
    comment_ids: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UsersCommentsCollection;