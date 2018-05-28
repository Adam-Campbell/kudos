import { Button } from '../Button';
import { Wrapper } from '../Layout';
import { 
    FormContainer,
    FormTitle,
    Fieldset,
    Legend,
    Label,
    Input,
    Textarea
} from '../Forms';

const UserDetailsForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <Fieldset>
                    <Legend>Update your account details</Legend>
                    <Label htmlFor="username">Username:</Label>
                    <Input 
                        type="text"
                        id="username"
                        name="username"
                        value={props.username}
                        onChange={props.handleUsernameUpdate}
                    />
                    <Label htmlFor="email">Email:</Label>
                    <Input 
                        type="email"
                        id="email"
                        name="email"
                        value={props.email}
                        onChange={props.handleEmailUpdate}
                    />
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                        id="bio"
                        value={props.bio}
                        onChange={props.handleBioUpdate}
                    />
                </Fieldset>
                <Button type="submit">Save</Button>
            </form>
        </FormContainer>
    </Wrapper>
);

export default UserDetailsForm;
