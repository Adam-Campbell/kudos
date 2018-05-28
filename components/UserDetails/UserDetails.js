import FollowUnfollowButton from './FollowUnfollowButton';

const UserDetails = ({_id, avatar, username, bio, followers, following, isLoggedIn}) => (
    <div>
        <img src={avatar} />
        <h1>{username}</h1>
        <p>{bio}</p>
        <div>
            <span>{followers} followers</span>
            <span>{following} following</span>
            {isLoggedIn && <FollowUnfollowButton _id={_id} />}
        </div>
    </div>
);

export default UserDetails;