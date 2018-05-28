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

const UserPasswordForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <Fieldset>
                    <Legend>Update your password</Legend>
                    <Label htmlFor="current-password">Current password:</Label>
                    <Input 
                        type="password"
                        id="current-password"
                        name="current_password"
                        value={props.currentPassword}
                        onChange={props.handleCurrentPasswordUpdate}
                    />
                    <Label htmlFor="new-password">New password:</Label>
                    <Input 
                        type="password"
                        id="new-password"
                        name="new_password"
                        value={props.newPassword}
                        onChange={props.handleNewPasswordUpdate}
                    />
                    <Label htmlFor="confirm-new-password">Confirm new password:</Label>
                    <Input 
                        type="password"
                        id="confirm-password"
                        name="confirm_password"
                        value={props.confirmPassword}
                        onChange={props.handleConfirmPasswordUpdate}
                    />
                </Fieldset>
                <Button type="submit">Save</Button>
            </form>
        </FormContainer>
    </Wrapper>
);

export default UserPasswordForm;
