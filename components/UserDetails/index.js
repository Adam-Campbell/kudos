import { connect } from 'react-redux';
import UserDetails from './UserDetails';

const UserDetailsContainer = props => {
    const user = props.users[props._id];
    return <UserDetails 
            avatar={user.avatar}
            username={user.username}
            _id={user._id}
            bio={user.bio}
            followers={user.followers}
            following={user.following}
            isLoggedIn={props.isLoggedIn}
        />
}

const mapStateToProps = state => ({
    users: state.users.models,
    isLoggedIn: state.currentUser.isLoggedIn
});

export default connect(mapStateToProps)(UserDetailsContainer);