import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { Wrapper } from '../Layout'
import { Button } from '../Button';
import {
    FormContainer,
    FormTitle,
    Fieldset,
    Legend,
    Label,
    Input,
    Anchor
} from '../Forms';

const WarningContainer = styled.div`
    width: 100%;
    border-radius: 3px;
    background-color: palevioletred;
`;

const WarningText = styled.p`
    font-family: ${styleConstants.fontSecondary}
    font-weight: 400;
    font-size: 16px;
    color: ${styleConstants.colorSecondary};
`;

const SignUpForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <FormTitle>Sign Up</FormTitle>
                <Fieldset>
                    <Legend>Please provide your details to create an account.</Legend>
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
                    <Label htmlFor="password">Password:</Label>
                    <Input 
                        type="password"
                        id="password"
                        name="password"
                        value={props.password}
                        onChange={props.handlePasswordUpdate}
                    />
                    <Label>Confirm Password</Label>
                    <Input 
                        type="password"
                        id="confirm-password"
                        name="confirm_password"
                        value={props.confirmPassword}
                        onChange={props.handleConfirmPasswordUpdate}
                    />
                </Fieldset>
                <Button type="submit">Sign Up</Button>
            </form>
            <Link passHref href="/signin">
                <Anchor>Already have an account? Sign in!</Anchor>
            </Link>
        </FormContainer>
    </Wrapper>
);

SignUpForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameUpdate: PropTypes.func.isRequired,
    handleEmailUpdate: PropTypes.func.isRequired,
    handlePasswordUpdate: PropTypes.func.isRequired,
    handleConfirmPasswordUpdate: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired
};

export default SignUpForm;
