import { connect } from 'react-redux';
import PostComment from './PostComment';

const PostCommentCollection = props => {
    const commentIds = props.posts[props._id].commentIds;
    return commentIds.map((_id, index) => (
        <PostComment _id={_id} key={index} />
    ));
};

const mapStateToProps = state => ({
    posts: state.posts.models
});

export default connect(mapStateToProps)(PostCommentCollection);