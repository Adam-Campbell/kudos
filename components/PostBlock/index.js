import { connect } from 'react-redux'; 
import PostBlock from './PostBlock';

const PostBlockContainer = props => {
    const post = props.posts[props._id];
    const author = props.users[post.author];
    return <PostBlock 
        _id={post._id}
        image={post.image}
        categories={post.categories}
        title={post.title}
        description={post.description}
        authorUsername={author.username}
        author_id={author._id}
    />
}

const mapStateToProps = state => ({
    posts: state.posts.models,
    users: state.users.models
});

export default connect(
    mapStateToProps
)(PostBlockContainer);