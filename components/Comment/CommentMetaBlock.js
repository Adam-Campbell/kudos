import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';

const MetaBlockContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
`;

const AuthorImage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => `url('${props.imageUrl}')`};
`;

const AuthorAnchor = styled.a`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    color: ${styleConstants.colorBodyText};
    text-decoration: none;
    display: inline-block;
    text-transform: capitalize;
    &:hover {
        color: ${styleConstants.colorPrimary};
        text-decoration: underline;
    }
`;

const Timestamp = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 14px;
    color: ${styleConstants.colorBodyText};
    margin-top: 4px;
    margin-bottom: 4px;
`;

const CommentMetaBlock = ({authorAvatar, author_id, authorUsername, commentCreatedAt}) => (
    <MetaBlockContainer>
        <AuthorImage imageUrl={authorAvatar}/>
        <div>
            <Link passHref as={`/user/${author_id}`} href={`/user?user=${author_id}`}>
                <AuthorAnchor>{authorUsername}</AuthorAnchor>
            </Link>
            <Timestamp>{new Date(commentCreatedAt).toUTCString()}</Timestamp>
        </div>
    </MetaBlockContainer>
);

export default CommentMetaBlock;