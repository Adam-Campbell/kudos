import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

export class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isOpen: false
        }
    }

    toggleNav(e) {
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    } 

    render() {
        return (
            <Header 
                isOpen={this.state.isOpen} 
                isLoggedIn={this.props.isLoggedIn} 
                hasFetched={this.props.hasFetched} 
                toggleNav={this.toggleNav}
                currentUser_id={this.props.currentUser_id}
            />    
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    hasFetched: state.currentUser.hasFetched,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(HeaderContainer); 