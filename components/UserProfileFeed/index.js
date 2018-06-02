import UserProfileFeedNav from './UserProfileFeedNav';
import CollectionSwitch from './CollectionSwitch';

const UserProfileFeed = props => (
    <section>
        <UserProfileFeedNav filter={props.filter} user_id={props.user_id} />
        <CollectionSwitch filter={props.filter} user_id={props.user_id} />
    </section>
);

export default UserProfileFeed;
