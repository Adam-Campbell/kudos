import { connect } from 'react-redux';
import UserProfileHeader from './UserProfileHeader';

const UserProfileHeaderContainer = props => {
    const user = props.users[props._id];

    return <UserProfileHeader 
        userAvatar={user.avatar}
        username={user.username}
        userBio={user.bio}
        userFollowers={user.followers}
        userFollowing={user.following}
        user_id={user._id}
    />
};

const mapStateToProps = state => ({
    users: state.users.models,
    isLoggedIn: state.currentUser.isLoggedIn
});

export default connect(
    mapStateToProps
)(UserProfileHeaderContainer);