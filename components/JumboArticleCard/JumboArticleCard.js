import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { AnchorButton } from '../Button';

const CardOuter = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    position: relative;
`;

const ArticleImage = styled.div`
    width: 100%;
    padding-bottom: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => `url('${props.imageUrl}')`};
`;

const ArticleCategory = styled.span`
    font-family: ${styleConstants.fontSecondary};
    font-size: 14px;
    display: inline-block;
    padding: 8px;
    background-color: ${styleConstants.colorPrimary};
    color: ${styleConstants.colorSecondary};
    position: absolute;
    left: 0;
    top: 40px;
    text-transform: capitalize;
`;

const AuthorInfo = styled.div`
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
    text-transform: capitalize;
    &:hover {
        color: ${styleConstants.colorPrimary};
        text-decoration: underline;
    }
`;

const ArticleInfo = styled.div`
    padding: 8px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-start;
`;

const ArticleTitle = styled.h1`
    font-family: ${styleConstants.fontPrimary};
    color: ${styleConstants.colorBodyText};
    margin-top: 8px;
    margin-bottom: 8px;
`;

const ArticleDescription = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
`;

const ArticleAnchor = styled(AnchorButton)`
    margin-top: auto;
`;

const JumboArticleCard = props => (
    <CardOuter>
        <ArticleImage imageUrl={props.articleImage} />
        <ArticleCategory>{props.articleCategory}</ArticleCategory>
        <AuthorInfo>
            <AuthorImage imageUrl={props.authorAvatar} />
            <Link passHref as={`/user/${props.author_id}`} href={`/user?user=${props.author_id}`}>
                <AuthorAnchor>{props.authorUsername}</AuthorAnchor>
            </Link>
        </AuthorInfo>
        <ArticleInfo>
            <ArticleTitle>{props.articleTitle}</ArticleTitle>
            <ArticleDescription>{props.articleDescription}</ArticleDescription>
            <Link passHref as={`/post/${props.article_id}`} href={`post?post=${props.article_id}`}>
                <ArticleAnchor>Read More</ArticleAnchor>
            </Link>
        </ArticleInfo>
    </CardOuter>
);

JumboArticleCard.propTypes = {
    article_id: PropTypes.string.isRequired,
    articleImage: PropTypes.string.isRequired,
    articleCategory: PropTypes.string.isRequired,
    articleTitle: PropTypes.string.isRequired,
    articleDescription: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired
};

export default JumboArticleCard;