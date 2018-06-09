import { shallow } from 'enzyme';
import { store } from '../../mockedStore';
import { UserPasswordFormContainer } from './index';
const mockedUpdateUserPassword = jest.fn();

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
    test('controlled inputs interact with state as expected', () => {
        const container = shallow(
            <UserPasswordFormContainer 
                token={store.currentUser.token}
                updateUserPassword={mockedUpdateUserPassword}
            /> 
        );
        const presenter = container.first().shallow();
        // test that container state and controlled input value are both set to empty strings initially
        expect(container.state('currentPassword')).toBe('');
        expect(presenter.find('Input#current-password').props().value).toBe('');
        // update the controlled input
        presenter.find('Input#current-password').simulate('change', { target: { value: 'foo' } });
        // test that the state updates when the controlled input does.
        expect(container.state('currentPassword')).toBe('foo');
        // force rerender of container and create wrapper for the new presentational component
        container.update();
        const updatedPresenter = container.first().shallow();
        // test that the new presentational component is rendered with the new state
        expect(updatedPresenter.find('Input#current-password').props().value).toBe('foo');
    });
    test('handleSubmit behaves as expected', () => {
        const container = shallow(
            <UserPasswordFormContainer 
                token={store.currentUser.token}
                updateUserPassword={mockedUpdateUserPassword}
            />
        );

        // create a state where one of the fields is missing
        container.setState({ 
            currentPassword: 'foo',
            newPassword: 'bar',
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
            currentPassword: 'foo',
            newPassword: 'bar',
            confirmPassword: 'baz'
        });
        // verify that nonMatchingPasswordsError is false
        expect(container.state('nonMatchingPasswordsError')).toBe(false);
        // try to submit form with non matching passwords
        container.instance().handleSubmit({preventDefault: () => {} });
        // verify that nonMatchingPasswordsError is now true
        expect(container.state('nonMatchingPasswordsError')).toBe(true);

        // create a state where everything is valid
        container.setState({
            currentPassword: 'foo',
            newPassword: 'bar',
            confirmPassword: 'bar'
        });
        // verify that mockedUpdateUserPassword has not yet been called
        expect(mockedUpdateUserPassword).not.toHaveBeenCalled();
        // submit form, this time instead of calling handleSubmit directly we trigger a submit
        // event on the form element, to ensure that this is triggering handleSubmit correctly.
        container.first().shallow().find('form').simulate('submit', {preventDefault: () => {} });
        // verify that mockedUpdateUserPassword has now been called exactly once.
        expect(mockedUpdateUserPassword).toHaveBeenCalledTimes(1);
        expect(mockedUpdateUserPassword).toHaveBeenCalledWith('foo', 'bar', store.currentUser.token);
    });
});
