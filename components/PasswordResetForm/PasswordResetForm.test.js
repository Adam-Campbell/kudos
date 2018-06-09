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
    test('controlled inputs interact with state as expected', () => {
        const container = shallow(
            <PasswordResetFormContainer 
                resetPasswordToken={resetPasswordToken}
                setNewPassword={mockedSetNewPassword}
            />
        );
        const presenter = container.first().shallow();
        // test that container state and controlled input value are both set to an empty string
        expect(container.state('password')).toBe('');
        expect(presenter.find('Input#password').props().value).toBe('');
        // update the controlled input
        presenter.find('Input#password').simulate('change', { target: { value: 'password123' } });
        // test that the state updates when the controlled input does.
        expect(container.state('password')).toBe('password123');
        // force rerender of container and create wrapper for the new presentational component
        container.update();
        const updatedPresenter = container.first().shallow();
        // test that the new presentational component is rendered with the new state
        expect(updatedPresenter.find('Input#password').props().value).toBe('password123');
    });
    test('handleSubmit behaves as expected', () => {
        const container = shallow(
            <PasswordResetFormContainer 
                resetPasswordToken={resetPasswordToken}
                setNewPassword={mockedSetNewPassword}
            />
        );

        // create a state where one of the fields is missing
        container.setState({ 
            password: 'password123',
            confirmPassword: ''
        });
        // verify that missingFieldsError is false
        expect(container.state('missingFieldsError')).toBe(false);
        // try to submit form with missing field
        container.instance().handleSubmit({preventDefault: () => {} });
        // verify that missingFieldsError is now true
        expect(container.state('missingFieldsError')).toBe(true);

        // create state where password confirmation does not match
        container.setState({ 
            password: 'password123',
            confirmPassword: 'password234'
        });
        // verify that nonMatchingPasswordsError is false
        expect(container.state('nonMatchingPasswordsError')).toBe(false);
        // try to submit form with non matching passwords
        container.instance().handleSubmit({preventDefault: () => {} });
        // verify that nonMatchingPasswordsError is now true
        expect(container.state('nonMatchingPasswordsError')).toBe(true);

        // create a state where everything is valid
        container.setState({ 
            password: 'password123',
            confirmPassword: 'password123'
        });
        // verify that mockedUpdateUserPassword has not yet been called
        expect(mockedSetNewPassword).not.toHaveBeenCalled();
        // submit form, this time instead of calling handleSubmit directly we trigger a submit
        // event on the form element, to ensure that this is triggering handleSubmit correctly.
        container.first().shallow().find('form').simulate('submit', {preventDefault: () => {} });
        // verify that mockedUpdateUserPassword has now been called exactly once.
        expect(mockedSetNewPassword).toHaveBeenCalledTimes(1);
        expect(mockedSetNewPassword).toHaveBeenCalledWith('password123', resetPasswordToken);
    });
});