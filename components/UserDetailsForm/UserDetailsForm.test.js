import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { UserDetailsFormContainer } from './index';
const mockedUpdateUserDetails = jest.fn();

describe('<UserDetailsFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <UserDetailsFormContainer 
                users={store.users}
                currentUser_id={store.currentUser._id}
                token={store.currentUser.token}
                email={store.currentUser.email}
                updateUserDetails={mockedUpdateUserDetails}
            />
        );
        // create wrapper for presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
    test('controlled inputs interact with state as expected', () => {
        const container = shallow(
            <UserDetailsFormContainer 
                users={store.users}
                currentUser_id={store.currentUser._id}
                token={store.currentUser.token}
                email={store.currentUser.email}
                updateUserDetails={mockedUpdateUserDetails}
            />
        );
        const presenter = container.first().shallow();
        // test that container state and controlled input value are both set to the initial state
        expect(container.state('username')).toBe('Joe Bloggs');
        expect(presenter.find('Input#username').props().value).toBe('Joe Bloggs');
        // update the controlled input
        presenter.find('Input#username').simulate('change', { target: { value: 'John Smith' } });
        // test that the state updates when the controlled input does.
        expect(container.state('username')).toBe('John Smith');
        // force rerender of container and create wrapper for the new presentational component
        container.update();
        const updatedPresenter = container.first().shallow();
        // test that the new presentational component is rendered with the new state
        expect(updatedPresenter.find('Input#username').props().value).toBe('John Smith');
    });
    test('the form submits as expected', () => {
        const container = shallow(
            <UserDetailsFormContainer 
                users={store.users}
                currentUser_id={store.currentUser._id}
                token={store.currentUser.token}
                email={store.currentUser.email}
                updateUserDetails={mockedUpdateUserDetails}
            />
        );
        expect(mockedUpdateUserDetails).not.toHaveBeenCalled();
        container.first().shallow().find('form').simulate('submit', {preventDefault: () => {} });
        expect(mockedUpdateUserDetails).toHaveBeenCalledTimes(1);
        expect(mockedUpdateUserDetails).toHaveBeenCalledWith(
            {
                username: store.users.user_A.username,
                email: store.currentUser.email,
                bio: store.users.user_A.bio,
            }, 
            store.currentUser._id, 
            store.currentUser.token
        );

    });
});