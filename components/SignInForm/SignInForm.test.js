import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { SignInFormContainer } from './index';
const mockedSignIn = jest.fn();

describe('<SignInFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <SignInFormContainer 
                signIn={mockedSignIn}
            />
        );
        // create wrapper for presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});