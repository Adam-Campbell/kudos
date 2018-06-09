import { shallow } from 'enzyme';
import { NewPostFormContainer } from './index';
import { store } from '../../mockedStore';
const mockedCreatePost = jest.fn();

describe('<NewPostFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <NewPostFormContainer 
                token={store.currentUser.token}
                currentUser_id={store.currentUser._id}
                createPost={mockedCreatePost}
            />
        );
        // create wrapper for presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});