import { Button } from '../Button';
import Link from 'next/link';
import {
    FormContainer,
    FormTitle,
    Fieldset,
    Legend,
    Label,
    Input,
    Anchor
} from '../Forms';

const SignInForm = props => (
    <FormContainer>
        <form onSubmit={props.handleSubmit}>
            <FormTitle>Sign In</FormTitle>
            <Fieldset>
                <Legend>Please enter your account details to sign in.</Legend>
                <Label htmlFor="username">Username:</Label>
                <Input 
                    type="text"
                    id="username" 
                    name="username"
                    value={props.username}
                    onChange={props.handleUsernameUpdate}
                />
                <Label htmlFor="password">Password:</Label>
                <Input 
                    type="password"
                    id="password"
                    name="password"
                    value={props.password}
                    onChange={props.handlePasswordUpdate}
                />
            </Fieldset>
            <Button type="submit">Sign In</Button>
        </form>
        <Link passHref href="/forgot">
            <Anchor>Forgotten your password?</Anchor>
        </Link>
        <Link passHref href="/signup">
            <Anchor>Don't have an account? Sign up!</Anchor>
        </Link>
    </FormContainer>
);

export default SignInForm;