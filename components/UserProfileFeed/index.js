import PropTypes from 'prop-types';
import UserProfileFeedNav from './UserProfileFeedNav';
import CollectionSwitch from './CollectionSwitch';

export const UserProfileFeed = props => (
    <section>
        <UserProfileFeedNav filter={props.filter} user_id={props.user_id} />
        <CollectionSwitch filter={props.filter} user_id={props.user_id} />
    </section>
);

UserProfileFeed.propTypes = {
    filter: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired
};

export default UserProfileFeed;
