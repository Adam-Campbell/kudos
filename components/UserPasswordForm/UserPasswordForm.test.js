import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { UserPasswordFormContainer } from './index';
const mockedUpdateUserPassword = jest.fn();
const alert = jest.fn();

describe('<UserPasswordFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <UserPasswordFormContainer 
                token={store.currentUser.token}
                updateUserPassword={mockedUpdateUserPassword}
            />
        );
        // create a wrapper for the presentational component returned.
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
    
});