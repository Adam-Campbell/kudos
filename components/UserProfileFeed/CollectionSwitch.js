import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersArticlesCollection from './UsersArticlesCollection';
import UsersCommentsCollection from './UsersCommentsCollection';
import UsersKudosCollection from './UsersKudosCollection';
import UsersHighlightsCollection from './UsersHighlightsCollection';

export const CollectionSwitch = props => {
    const user = props.users[props.user_id];

    switch (props.filter) {
        case 'posts':
            return <UsersArticlesCollection article_ids={user.postIds} />

        case 'comments':
            return <UsersCommentsCollection comment_ids={user.commentIds} />

        case 'kudos':
            return <UsersKudosCollection kudos_ids={user.kudosIds} />

        case 'highlights':
            return <UsersHighlightsCollection highlight_ids={user.highlightIds} />

        default:
            return <UsersArticlesCollection article_ids={user.postIds} />
    }
}

CollectionSwitch.propTypes = {
    filter: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired
};

const mapStateStateToProps = state => ({
    users: state.users.models
});

export default connect(mapStateStateToProps)(CollectionSwitch);
