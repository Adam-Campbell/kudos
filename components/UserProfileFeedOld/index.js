/*
This is the container component. It needs to take the user id (_id) and the filter. It will be connected
to the store and will retreive all of the models from the store that belong to the user. IE the posts, comments
etc. It will then render the appropriate type of model depending on what the filter prop it is passed says. 
*/

import { connect } from 'react-redux';
import UsersPostsCollection from './UsersPostsCollection';
import UsersCommentsCollection from './UsersCommentsCollection';
import UsersKudosCollection from './UsersKudosCollection';
import UsersHighlightsCollection from './UsersHighlightsCollection';


const UserProfileFeedContainer = props => {
    const user = props.users[props._id];
    
    switch (props.filter) {
        case 'posts':
            return <UsersPostsCollection 
                postIds={user.postIds}           
            />;

        case 'comments':
            return <UsersCommentsCollection 
                commentIds={user.commentIds}
            />

        case 'kudos':
            return <UsersKudosCollection 
                kudosIds={user.kudosIds}  
            />;

        case 'highlights':
            return <UsersHighlightsCollection 
                highlightIds={user.highlightIds}
            />

        default:
            return <UsersPostsCollection 
                postIds={user.postIds}            
            />;
            
    }
}

const mapStateToProps = state => ({
    users: state.users.models,
    posts: state.posts.models,
    comments: state.comments,
    kudos: state.kudos,
    highlights: state.highlights
});

export default connect(mapStateToProps)(UserProfileFeedContainer);
