import { shallow } from 'enzyme';
import { FollowButtonContainer } from './index';
import { store } from '../../mockedStore';
const user_id = 'user_B';
const altUser_id = 'user_A';
const mockedFollowUser = jest.fn();
const mockedUnfollowUser = jest.fn();

describe('<FollowButtonContainer/>', () => {
    test("doesn't render a button if the user isn't logged in", () => {
        const container = shallow(
            <FollowButtonContainer 
                user_id={user_id}
                isLoggedIn={false}
                currentUserFollows={[]}
                token={''}
            />
        );
        expect(container.find('FollowButton')).toHaveLength(0);
    });
    test('renders and behaves correctly when user does follow', () => {
        const container = shallow(
            <FollowButtonContainer 
                user_id={user_id}
                isLoggedIn={store.currentUser.isLoggedIn}
                currentUserFollows={store.currentUser.follows}
                token={store.currentUser.token}
                followUser={mockedFollowUser}
                unfollowUser={mockedUnfollowUser}
            />
        );
        // Create wrapper for the presentational component returned.
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
        // check correct prop is passed to the presentational component
        expect(container.find('FollowButton').prop('doesFollow')).toBe(true);
        // check the correct function is called onClick
        expect(mockedUnfollowUser).not.toHaveBeenCalled();
        presenter.find('Button').simulate('click');
        expect(mockedUnfollowUser).toHaveBeenCalledTimes(1);
    });
    test("renders and behaves correctly when user doesn't follow", () => {
        const container = shallow(
            <FollowButtonContainer 
                user_id={altUser_id}
                isLoggedIn={store.currentUser.isLoggedIn}
                currentUserFollows={store.currentUser.follows}
                token={store.currentUser.token}
                followUser={mockedFollowUser}
                unfollowUser={mockedUnfollowUser}
            />
        );
        // Create wrapper for the presentational component returned.
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
        // check correct prop is passed to the presentational component
        expect(container.find('FollowButton').prop('doesFollow')).toBe(false);
        // check the correct function is called onClick
        expect(mockedFollowUser).not.toHaveBeenCalled();
        presenter.find('Button').simulate('click');
        expect(mockedFollowUser).toHaveBeenCalledTimes(1);
    });
});