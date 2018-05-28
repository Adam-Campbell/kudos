import { connect } from 'react-redux';
import NavBar from './NavBar';

const NavBarContainer = props => (
    <NavBar isLoggedIn={props.isLoggedIn} hasFetched={props.hasFetched}/>
);

const mapStateToProps = state => ({
    isLoggedIn: state.currentUser.isLoggedIn,
    hasFetched: state.currentUser.hasFetched
});

export default connect(mapStateToProps)(NavBarContainer);