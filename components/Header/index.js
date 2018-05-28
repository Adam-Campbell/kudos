import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

// const HeaderContainer = props => (
//     <Header isLoggedIn={props.isLoggedIn} hasFetched={props.hasFetched} />
// );

class HeaderContainer extends Component {
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
            />    
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    hasFetched: state.currentUser.hasFetched
});

export default connect(mapStateToProps)(HeaderContainer); 