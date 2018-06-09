import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import FollowButton from './FollowButton';

export class FollowButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
    }

    handleFollow() {
        this.props.followUser(this.props.user_id, this.props.token);
    }

    handleUnfollow() {
        this.props.unfollowUser(this.props.user_id, this.props.token);
    }

    render() {
        if (!this.props.isLoggedIn) return null;
        const doesFollow = this.props.currentUserFollows.includes(this.props.user_id);
        return <FollowButton 
            doesFollow={doesFollow}
            followUser={this.handleFollow}
            unfollowUser={this.handleUnfollow}
            className={this.props.className}
        />
    }
}

FollowButtonContainer.propTypes = {
    user_id: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUserFollows: state.currentUser.follows,
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    {
        followUser: ActionCreators.followUser,
        unfollowUser: ActionCreators.unfollowUser
    }
)(FollowButtonContainer);