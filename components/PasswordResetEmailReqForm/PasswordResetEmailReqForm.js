import { Button } from '../Button';
import { Wrapper } from '../Layout';
import Portal from '../Portal';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import {
    FormContainer,
    FormTitle,
    Fieldset,
    Legend,
    Label,
    Input
} from '../Forms';

const PasswordResetEmailReqForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <Fieldset>
                    <Legend>Request an email to reset your password.</Legend>
                    <Label>Email address:</Label>
                    <Input 
                        type="email"
                        id="email"
                        name="email"
                        value={props.email}
                        onChange={props.handleEmailUpdate}
                    />
                </Fieldset>
                <Button type="submit">Send me an email</Button>
            </form>
        </FormContainer>
        {
            props.emailNotFound && 
            <Portal> <ErrorModal closeModal={props.closeErrorModal}/> </Portal>
        }
        {
            props.passwordResetEmailSent && 
            <Portal> <SuccessModal closeModal={props.closeSuccessModal}/> </Portal>
        }
    </Wrapper>
);

export default PasswordResetEmailReqForm;