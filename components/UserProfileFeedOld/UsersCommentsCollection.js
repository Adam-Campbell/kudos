import Comment from '../Comment';

const UsersCommentsCollection = props => (
    <div>
        {props.commentIds.map((commentId, index) => (
            <Comment 
                key={index}
                _id={commentId}
            />
        ))}
    </div>
);

export default UsersCommentsCollection;