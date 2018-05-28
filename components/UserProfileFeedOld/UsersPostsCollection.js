import PostBlock from '../PostBlock';

// this will take the array of posts and the author as props

const UsersPostCollection = props => (
    <div>
        {props.postIds.map((postId, index) => (
            <PostBlock key={index} _id={postId} />
        ))}
    </div>
);

export default UsersPostCollection;