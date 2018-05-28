import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import KudosButton from './KudosButton';

class KudosButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.handleGiveKudos = this.handleGiveKudos.bind(this);
        this.handleRemoveKudos = this.handleRemoveKudos.bind(this);
    }

    handleGiveKudos() {
        this.props.giveKudos(
            this.props.article_id, 
            this.props.currentUser_id, 
            this.props.token
        );
    }

    handleRemoveKudos() {
        this.props.removeKudos(
            this.props.article_id, 
            this.props.currentUser_id, 
            this.props.token
        );
    }

    render() {
        if (!this.props.isLoggedIn) return null;
        const currentUser = this.props.users[this.props.currentUser_id];
        const hasGivenKudos = currentUser.kudosIds.includes(this.props.article_id);
        return <KudosButton 
            hasGivenKudos={hasGivenKudos}
            giveKudos={this.handleGiveKudos}
            removeKudos={this.handleRemoveKudos}
        />
    }
}

const mapStateToProps = state => ({
    users: state.users.models,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token,
    isLoggedIn: state.currentUser.isLoggedIn
});

// actions require post_id, currentUser_id, token as arguments in that order.
export default connect(
    mapStateToProps,
    {
        giveKudos: ActionCreators.giveKudos,
        removeKudos: ActionCreators.removeKudos
    }
)(KudosButtonContainer);