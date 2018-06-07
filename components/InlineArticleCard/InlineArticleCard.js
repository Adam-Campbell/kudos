import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { AnchorButton } from '../Button';

const CardOuter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 2px;
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    margin-top: 16px;
    margin-bottom: 16px;
    @media(min-width: 500px) {
        flex-direction: row;
    }
`;

const ArticleImage = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-bottom: 33.33333%;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => `url('${props.imageUrl}')`};
    @media(min-width: 500px) {
        height: 100%;
        width: 160px;
        padding-bottom: initial;
    }
    @media(min-width: 620px) {
        width: 220px;
    }
    @media(min-width: 768px) {
        width: 320px;
    }
`;

const ArticleInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    width: 100%;
    @media(min-width: 500px) {
        margin-left: 8px;
    }
`;

const ArticleTitle = styled.p`
    font-family: ${styleConstants.fontPrimary};
    font-size: 1.5rem;
    color: ${styleConstants.colorBodyText};
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
`;

const AuthorAnchor = styled.a`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    color: ${styleConstants.colorBodyText};
    text-decoration: none;
    text-transform: capitalize;
    &:hover {
        text-decoration: underline;
        color: ${styleConstants.colorPrimary};
    }
`;

const ArticleAnchor = styled(AnchorButton)`
    margin-top: 16px;
`;


const InlineArticleCard = props => (
    <CardOuter>
        <ArticleImage imageUrl={props.articleImage} />
        <ArticleInfo>
            <ArticleTitle>{props.articleTitle}</ArticleTitle>
            <Link passHref as={`/user/${props.author_id}`} href={`/user?user=${props.author_id}`}>
                <AuthorAnchor>{props.authorUsername}</AuthorAnchor>
            </Link>
            <Link passHref as={`/post/${props.article_id}`} href={`/post?post=${props.article_id}`}>
                <ArticleAnchor>Read More</ArticleAnchor>
            </Link>
        </ArticleInfo>
    </CardOuter>
);

InlineArticleCard.propTypes = {
    article_id: PropTypes.string.isRequired,
    articleImage: PropTypes.string.isRequired,
    articleTitle: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired
};

export default InlineArticleCard;