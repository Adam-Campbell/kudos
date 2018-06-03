import PropTypes from 'prop-types';
import { Wrapper } from '../Layout';
import { Button } from '../Button';
import {
    FormContainer,
    FormTitle,
    Fieldset,
    Legend,
    Label,
    Input
} from '../Forms';

const PasswordResetForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <FormTitle>Update your password</FormTitle>
                <Fieldset>
                    <Legend>Enter your new password into the fields below.</Legend>
                    <Label htmlFor="password">Password:</Label>
                    <Input 
                        type="password"
                        id="password"
                        name="password"
                        value={props.password}
                        onChange={props.handlePasswordUpdate}
                    />
                    <Label htmlFor="confirm-password">Confirm Password:</Label>
                    <Input 
                        type="password"
                        id="confirm-password"
                        name="confirm_password"
                        value={props.confirmPassword}
                        onChange={props.handleConfirmPasswordUpdate}
                    />
                </Fieldset>
                <Button type="submit">Update Password</Button>
            </form>
        </FormContainer>
    </Wrapper>
);

PasswordResetForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handlePasswordUpdate: PropTypes.func.isRequired,
    handleConfirmPasswordUpdate: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired
};

export default PasswordResetForm;
