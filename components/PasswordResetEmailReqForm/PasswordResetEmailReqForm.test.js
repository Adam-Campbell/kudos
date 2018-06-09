import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { PasswordResetEmailReqFormContainer } from './index';
const mockedGetPasswordResetEmail = jest.fn();
const mockedEmailNotFoundErrorAcknowledge = jest.fn();
const mockedPasswordResetEmailSentAcknowledge = jest.fn();

describe('<PassswordResetEmailReqForm/>', () => {
    test('renders correctly', () => {
        const container = shallow(
            <PasswordResetEmailReqFormContainer 
                emailNotFound={store.errors.emailNotFound}
                passwordResetEmailSent={store.successes.passwordResetEmailSent}
                getPasswordResetEmail={mockedGetPasswordResetEmail}
                emailNotFoundErrorAcknowledge={mockedEmailNotFoundErrorAcknowledge}
                passwordResetEmailSentAcknowledge={mockedPasswordResetEmailSentAcknowledge}
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
            <PasswordResetEmailReqFormContainer 
                emailNotFound={store.errors.emailNotFound}
                passwordResetEmailSent={store.successes.passwordResetEmailSent}
                getPasswordResetEmail={mockedGetPasswordResetEmail}
                emailNotFoundErrorAcknowledge={mockedEmailNotFoundErrorAcknowledge}
                passwordResetEmailSentAcknowledge={mockedPasswordResetEmailSentAcknowledge}
            />
        );
        const presenter = container.first().shallow();
        // test that container state and controlled input value are both set to an empty string
        expect(container.state('email')).toBe('');
        expect(presenter.find('Input#email').props().value).toBe('');
        // update the controlled input
        presenter.find('Input#email').simulate('change', { target: { value: 'example@example.com' } });
        // test that the state updates when the controlled input does.
        expect(container.state('email')).toBe('example@example.com');
        // force rerender of container and create wrapper for the new presentational component
        container.update();
        const updatedPresenter = container.first().shallow();
        // test that the new presentational component is rendered with the new state
        expect(updatedPresenter.find('Input#email').props().value).toBe('example@example.com');
    });
    test('handleSubmit behaves as expected', () => {
        const container = shallow(
            <PasswordResetEmailReqFormContainer 
                emailNotFound={store.errors.emailNotFound}
                passwordResetEmailSent={store.successes.passwordResetEmailSent}
                getPasswordResetEmail={mockedGetPasswordResetEmail}
                emailNotFoundErrorAcknowledge={mockedEmailNotFoundErrorAcknowledge}
                passwordResetEmailSentAcknowledge={mockedPasswordResetEmailSentAcknowledge}
            />
        );

        // create a state where everything is valid
        container.setState({ 
            email: 'example@example.com',
        });
        // verify that mockedUpdateUserPassword has not yet been called
        expect(mockedGetPasswordResetEmail).not.toHaveBeenCalled();
        // submit form, this time instead of calling handleSubmit directly we trigger a submit
        // event on the form element, to ensure that this is triggering handleSubmit correctly.
        container.first().shallow().find('form').simulate('submit', {preventDefault: () => {} });
        // verify that mockedUpdateUserPassword has now been called exactly once.
        expect(mockedGetPasswordResetEmail).toHaveBeenCalledTimes(1);
        expect(mockedGetPasswordResetEmail).toHaveBeenCalledWith('example@example.com');
    });
});