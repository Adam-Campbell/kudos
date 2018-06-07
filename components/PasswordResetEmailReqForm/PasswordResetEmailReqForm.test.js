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
});