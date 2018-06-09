import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Logo from './Logo';
import { AnchorButton } from '../Button';
import Avatar from './Avatar';
import UserNav from './UserNav';
import CategoryNav from './CategoryNav';
import Link from 'next/link';

const HeaderOuter = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: ${styleConstants.colorSecondary};
    border-bottom: solid 2px ${styleConstants.colorSecondaryAlt};
    margin-bottom: 16px;
`;

const HeaderContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 8px 16px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
`;

const SignInAnchor = styled(AnchorButton)`
    margin-left: auto;
`;

const CreateAccountAnchor = styled(AnchorButton)`
    display: none;
    @media(min-width: 480px) {
        display: inline-block;
        margin-left: 8px;
    }
`;


const Header = props => (
    <HeaderOuter>
        <HeaderContentWrapper>
            <Logo />
            {
                props.isLoggedIn ? (
                    <Avatar handleClick={props.toggleNav}/>
                ) : (
                    <React.Fragment>
                        <Link passHref href="/signin">
                            <SignInAnchor>Sign In</SignInAnchor>
                        </Link>
                        <Link passHref href="/signup">
                            <CreateAccountAnchor>Create Account</CreateAccountAnchor>
                        </Link>
                    </React.Fragment>
                )
            }
        </HeaderContentWrapper>
        {props.isLoggedIn && <UserNav isOpen={props.isOpen}/>}
        <HeaderContentWrapper>
            <CategoryNav />
        </HeaderContentWrapper>
    </HeaderOuter>
);

Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    hasFetched: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
};

export default Header;
