import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

const FollowUnfollowButton = props => {
    const doesFollow = props.follows.includes(props._id);
    return doesFollow ? ( 
        <button onClick={() => props.unfollowUser(props._id, props.token)}>
            Unfollow
        </button>
    ) : (
        <button onClick={() => props.followUser(props._id, props.token)}>
            Follow
        </button>
    )
};

const mapStateToProps = state => ({
    follows: state.currentUser.follows,
    token: state.currentUser.token
});

export default connect(
    mapStateToProps,
    {
        followUser: ActionCreators.followUser,
        unfollowUser: ActionCreators.unfollowUser
    }
)(FollowUnfollowButton);

