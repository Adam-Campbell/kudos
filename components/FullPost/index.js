import { connect } from 'react-redux'; 
import FullPost from './FullPost';

const FullPostContainer = props => {
    const post = props.posts[props._id];
    const author = props.users[post.author];
    return <FullPost 
        _id={props._id}
        image={post.image}
        categories={post.categories}
        title={post.title}
        text={post.text}
        kudos={post.kudos}
        authorUsername={author.username}
        author_id={author._id}
        isLoggedIn={props.currentUser.isLoggedIn}
    />
}

const mapStateToProps = state => ({
    posts: state.posts.models,
    users: state.users.models,
    currentUser: state.currentUser
});

export default connect(
    mapStateToProps
)(FullPostContainer);