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
    test('controlled inputs interact with state as expected', () => {
        const container = shallow(
            <SignInFormContainer 
                signIn={mockedSignIn}
            />
        );
        const presenter = container.first().shallow();
        // test that container state and controlled input value are both set to an empty string
        expect(container.state('username')).toBe('');
        expect(presenter.find('Input#username').props().value).toBe('');
        // update the controlled input
        presenter.find('Input#username').simulate('change', { target: { value: 'John Smith' } });
        // test that the state updates when the controlled input does.
        expect(container.state('username')).toBe('John Smith');
        // force rerender of container and create wrapper for the new presentational component
        container.update();
        const updatedPresenter = container.first().shallow();
        // test that the new presentational component is rendered with the new state
        expect(updatedPresenter.find('Input#username').props().value).toBe('John Smith');
    });
    test('handleSubmit behaves as expected', () => {
        const container = shallow(
            <SignInFormContainer 
                signIn={mockedSignIn}
            />
        );

        // create a state where one of the fields is missing
        container.setState({ 
            username: 'John Smith',
            password: ''
        });
        // verify that missingFieldsError is false
        expect(container.state('missingFieldsError')).toBe(false);
        // try to submit form with missing field
        container.instance().handleSubmit({preventDefault: () => {} });
        // verify that missingFieldsError is now true
        expect(container.state('missingFieldsError')).toBe(true);

        // create a state where everything is valid
        container.setState({ 
            username: 'John Smith',
            password: 'password123'
        });
        // verify that mockedUpdateUserPassword has not yet been called
        expect(mockedSignIn).not.toHaveBeenCalled();
        // submit form, this time instead of calling handleSubmit directly we trigger a submit
        // event on the form element, to ensure that this is triggering handleSubmit correctly.
        container.first().shallow().find('form').simulate('submit', {preventDefault: () => {} });
        // verify that mockedUpdateUserPassword has now been called exactly once.
        expect(mockedSignIn).toHaveBeenCalledTimes(1);
        expect(mockedSignIn).toHaveBeenCalledWith('John Smith', 'password123');
    });
});