import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { SignUpFormContainer } from './index';
const mockedSignUp = jest.fn();

describe('<SignUpFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <SignUpFormContainer 
                signUpDuplicateError={store.errors.signUpDuplicateError}
                signUp={mockedSignUp}
            />
        );
        // create wrapper for presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});