import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthorBlock from './AuthorBlock';

export const AuthorBlockContainer = props => {
    const author = props.users[props.user_id];
    return <AuthorBlock 
        author_id={author._id}
        authorAvatar={author.avatar}
        authorUsername={author.username}
        authorBio={author.bio}
    />
};

AuthorBlockContainer.propTypes = {
    user_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    users: state.users.models
});

export default connect(mapStateToProps)(AuthorBlockContainer);