import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

const KudosButton = props => {
    const currentUsersKudos = props.users[props.currentUser_id].kudosIds;
    const hasGivenKudos = currentUsersKudos.includes(props._id);
    return hasGivenKudos ? (
        <button 
            onClick={() => props.removeKudos(props._id, props.currentUser_id, props.token)}
        >Remove Kudos</button>
    ) : (
        <button
            onClick={() => props.giveKudos(props._id, props.currentUser_id, props.token)}
        >Give Kudos</button>
    );
};


const mapStateToProps = state => ({
    users: state.users.models,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token
});

export default connect(
    mapStateToProps,
    {
        giveKudos: ActionCreators.giveKudos,
        removeKudos: ActionCreators.removeKudos
    }
)(KudosButton);