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
                token={store.currentUser._id}
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
});