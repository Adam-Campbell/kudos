import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';

const Nav = styled.nav`

`;

const NavList = styled.ul`
    list-style: none;
    padding-left: 0;
`;

const NavItem = styled.li`
    display: inline-block;
`;

const NavAnchor = styled.a`
    display: block;
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: ${props => props.active ? 400 : 300};
    color: ${styleConstants.colorBodyText};
    text-decoration: ${props => props.active ? 'underline': 'none'};
    padding: 8px 16px;
    &:hover {
        text-decoration: underline;
    }
`;

const UserProfileFeedNav = props => (
    <section>
        <Nav>
            <NavList>
                <NavItem>
                    <Link passHref as={`/user/${props.user_id}/posts`} href={`user?user=${props.user_id}&filter=posts`}>
                        <NavAnchor active={props.filter === 'posts' || props.filter === undefined}>Posts</NavAnchor>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link passHref as={`/user/${props.user_id}/comments`} href={`user?user=${props.user_id}&filter=comments`}>
                        <NavAnchor active={props.filter === 'comments'}>Comments</NavAnchor>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link passHref as={`/user/${props.user_id}/kudos`} href={`user?user=${props.user_id}&filter=kudos`}>
                        <NavAnchor active={props.filter === 'kudos'}>Kudos</NavAnchor>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link passHref as={`/user/${props.user_id}/highlights`} href={`user?user=${props.user_id}&filter=highlights`}>
                        <NavAnchor active={props.filter === 'highlights'}>Highlights</NavAnchor>
                    </Link>
                </NavItem>
            </NavList>
        </Nav>
    </section>
);

export default UserProfileFeedNav;
