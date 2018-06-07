import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { PasswordResetFormContainer } from './index';
const resetPasswordToken = 'xyz987';
const mockedSetNewPassword = jest.fn();

describe('<PasswordResetFormContainer/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <PasswordResetFormContainer 
                resetPasswordToken={resetPasswordToken}
                setNewPassword={mockedSetNewPassword}
            />
        );
        // create wrapper for the presentational component returned
        const presenter = container.first().shallow();
        // check snapshots for the container and presentational components
        expect(container).toMatchSnapshot();
        expect(presenter).toMatchSnapshot();
    });
});