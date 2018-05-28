import { connect } from 'react-redux';
import Kudos from './Kudos';

const KudosContainer = props => {
    //const kudos = props.kudos[props._id];
    const post = props.posts[props._id];
    const author = props.users[post.author];
    return <Kudos 
        post_id={post._id} 
        title={post.title} 
        description={post.description} 
        authorUsername={author.username} 
        author_id={author._id}
    />
};

const mapStateToProps = state => ({
    posts: state.posts.models,
    users: state.users.models
});

export default connect(mapStateToProps)(KudosContainer);
