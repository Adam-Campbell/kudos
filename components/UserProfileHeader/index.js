import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserProfileHeader from './UserProfileHeader';

const UserProfileHeaderContainer = props => {
    const user = props.users[props.user_id];

    return <UserProfileHeader 
        userAvatar={user.avatar}
        username={user.username}
        userBio={user.bio}
        userFollowers={user.followers}
        userFollowing={user.following}
        user_id={user._id}
    />
};

UserProfileHeaderContainer.propTypes = {
    user_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    users: state.users.models,
    isLoggedIn: state.currentUser.isLoggedIn
});

export default connect(
    mapStateToProps
)(UserProfileHeaderContainer);
