import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLinks from './UserLinks';
import { signOut } from '../../actions';

class UserLinksContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const currentUserModel = this.props.users[this.props.currentUser._id];

        return <UserLinks 
            hasFetched={this.props.currentUser.hasFetched}
            currentUserModel={currentUserModel}
            handleClick={this.props.signOut}
        />
    }
}



const mapStateToProps = state => ({
    currentUser: state.currentUser,
    users: state.users.models
});



export default connect(mapStateToProps, { signOut })(UserLinksContainer);
