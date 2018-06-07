import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { UserProfileFeed } from './index';
import UserProfileFeedNav from './UserProfileFeedNav';
import { CollectionSwitch } from './CollectionSwitch';
import UsersArticlesCollection from './UsersArticlesCollection';
import UsersCommentsCollection from './UsersCommentsCollection';
import UsersHighlightsCollection from './UsersHighlightsCollection';
import UsersKudosCollection from './UsersKudosCollection';
const user_id = 'user_A';

describe('<UserProfileFeed/>', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <UserProfileFeed 
                user_id={user_id}
                filter={'posts'}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<UserProfileFeedNav/>', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <UserProfileFeedNav 
                user_id={user_id}
                filter={'posts'}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<CollectionSwitch/>', () => {
    test('renders correctly according the filter prop supplied to it', () => {
        const withPosts = shallow(
            <CollectionSwitch 
                user_id={user_id}
                users={store.users}
                filter={'posts'}
            />
        );
        expect(withPosts).toMatchSnapshot();
        expect(withPosts.find('UsersArticlesCollection')).toHaveLength(1);
        expect(withPosts.find('UsersCommentsCollection')).toHaveLength(0);
        const withComments = shallow(
            <CollectionSwitch 
                user_id={user_id}
                users={store.users}
                filter={'comments'}
            />
        );
        expect(withComments).toMatchSnapshot();
        expect(withComments.find('UsersCommentsCollection')).toHaveLength(1);
        expect(withComments.find('UsersArticlesCollection')).toHaveLength(0);
    });
});

describe('<UsersArticlesCollection', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <UsersArticlesCollection 
                article_ids={store.users.user_A.postIds}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<UsersCommentsCollection', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <UsersCommentsCollection 
                comment_ids={store.users.user_A.commentIds}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<UsersKudosCollection', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <UsersKudosCollection 
                kudos_ids={store.users.user_A.kudosIds}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<UsersHighlightsCollection', () => {
    test('renders correctly', () => {
        const wrapper = shallow(
            <UsersHighlightsCollection 
                highlight_ids={store.users.user_A.highlightIds}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
