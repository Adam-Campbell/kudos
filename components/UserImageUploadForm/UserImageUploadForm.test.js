import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { UserImageUploadFormContainer } from './index';

describe('<UserImageUploadeFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <UserImageUploadFormContainer 
                token={store.currentUser.token}
                currentUser_id={store.currentUser._id}
            />
        );
        // create wrapper for the presentational component returned
        const presenter = container.first().shallow();
        // check snapshots from container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});