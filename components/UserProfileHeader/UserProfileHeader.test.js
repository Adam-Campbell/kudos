import { shallow } from 'enzyme';
import { UserProfileHeaderContainer } from './index';
import { store } from '../../mockedStore';
const user_id = 'user_A';

describe('<UserProfileHeaderContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <UserProfileHeaderContainer 
                user_id={user_id}
                users={store.users}
            />
        );
        // create wrapper for the presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});