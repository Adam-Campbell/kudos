import { connect } from 'react-redux';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';

const UserNav = styled.nav`
    background-color: ${styleConstants.colorPrimary};
    overflow: hidden;
    height: ${props => props.isOpen ? '200px' : '0'};
    transition: height ease 0.175s;
    z-index: 100;
    @media(min-width: 768px) {
        position: absolute;
        right: 8px;
        border-radius: 3px;
    }
`;

const UserNavWrapper = styled.div`
    @media(min-width: 768px) {
        padding-left: 16px;
        padding-right: 16px;
        max-width: 1000px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }
`;

const List = styled.ul`
    padding-left: 0;
    margin: 0;
`;

const ListItem = styled.li`
    list-style: none;
`;

const Anchor = styled.a`
    color: ${styleConstants.colorSecondary};
    padding: 16px;
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    display: block;
    text-align: center;
    text-decoration: none;
`;


const ComposedUserNav = props => {
    return (
        <UserNavWrapper>
            <UserNav isOpen={props.isOpen}>
                <List>
                    <ListItem>
                        <Link passHref as={`/user/${props.currentUser_id}`} href={`/user?user=${props.currentUser_id}`}>
                            <Anchor>View your profile</Anchor>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link passHref href="/account-details">
                            <Anchor>Edit account details</Anchor>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link passHref href="/new-post">
                            <Anchor>Write a new article</Anchor>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Anchor>Log out</Anchor>
                    </ListItem>
                </List>
            </UserNav>
        </UserNavWrapper>
    );
};

const mapStateToProps = state => ({
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(ComposedUserNav);