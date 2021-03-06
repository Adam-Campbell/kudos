import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../Button';

const FollowButton = props => {
    return props.doesFollow ? (
        <Button 
            className={props.className}
            onClick={props.unfollowUser}
        >Unfollow</Button>
    ) : (
        <Button 
            className={props.className}
            onClick={props.followUser}
        >Follow</Button>
    )
};

FollowButton.propTypes = {
    doesFollow: PropTypes.bool.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired
};

export default FollowButton;