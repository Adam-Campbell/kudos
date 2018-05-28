import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
//import { Button } from '../Button';
import FollowButton from '../FollowButton';

const AuthorBlockOuter = styled.div`
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
`;

const AuthorImage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => `url('${props.imageUrl}')`};
`;

const AuthorInfo = styled.div`
    margin-left: 16px;
`;

const AuthorAnchor = styled.a`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 14px;
    color: ${styleConstants.colorBodyText};
    margin-top: 4px;
    margin-bottom: 4px;
    display: inline-block;
    text-decoration: none;
    text-transform: capitalize;
    &:hover {
        color: ${styleConstants.colorPrimary};
        text-decoration: underline;
    }
`;

const AuthorBio = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    margin-top: 8px;
    margin-bottom: 4px;
`;

// const FollowButton = Button.extend`
//     margin-left: 16px;
//     align-self: center;
// `;

const StyledFollowButton = styled(FollowButton)`
    margin-left: 16px;
`;

const AuthorBlock = props => (
    <AuthorBlockOuter>
        <AuthorImage imageUrl={props.authorAvatar}/>
        <AuthorInfo>
            <div>
                <Link passHref as={`/user/${props.author_id}`} href={`/user?user=${props.author_id}`}>
                    <AuthorAnchor>{props.authorUsername}</AuthorAnchor>
                </Link>
                <StyledFollowButton user_id={props.author_id} />
            </div>
            <AuthorBio>{props.authorBio}</AuthorBio>
        </AuthorInfo>
    </AuthorBlockOuter>
);

export default AuthorBlock;