import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import ArticleTitleDisplay from './ArticleTitleDisplay';
import ArticleDescriptionDisplay from './ArticleDescriptionDisplay';
import ArticleFeatureImageDisplay from './ArticleFeatureImageDisplay';
import ArticleBodyDisplay from './ArticleBodyDisplay';
import AuthorBlock from '../AuthorBlock';
import KudosButton from '../KudosButton';
import { AnchorButton } from '../Button';
import Link from 'next/link';
import ArticleCommentBoxContainer from './ArticleCommentBoxContainer';
import { Wrapper } from '../Layout';
import Comment from '../Comment';

const KudosStatsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const KudosStat = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 14px;
    color: ${styleConstants.colorBodyText};
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 16px;
    span {
        font-weight: 400;
        color: ${styleConstants.colorPrimary};
    }
`;

const EditArticleButton = styled(AnchorButton)`
    margin-bottom: 16px;
    display: inline-block;
`;

const EditArticleButtonContainer = styled.div`
    text-align: center;
    padding: 16px;
`;

const ArticleLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    @media(min-width: 768px) {
        flex-direction: ${props => props.isInlineLayout ? 'row' : 'column'};
        padding-right: ${props => props.isInlineLayout ? '16px' : '0'};
        align-items: ${props => props.isInlineLayout ? 'center' : 'stretch'};
        max-width: ${props => props.isInlineLayout ? '1400px' : '100%'};
    }
`;

const TitleAndDescriptionContainer = styled.div`
    width: 100%;
    max-width: 832px;
    margin-left: auto;
    margin-right: auto;
    padding: 16px;
`;

/*
Need:
ArticleLayoutContainer
TitleAndDescriptionContainer

*/


const Article = props => (
    <div>
        {props.isAuthor && 
            <EditArticleButtonContainer>
                <Link 
                    passHref 
                    as={`/edit-post/${props.article_id}`} 
                    href={`/edit-post?post=${props.article_id}`}
                >
                    <EditArticleButton>Edit this article</EditArticleButton>
                </Link>
            </EditArticleButtonContainer>
        }
        <ArticleLayoutContainer isInlineLayout={props.isInline}>
            <TitleAndDescriptionContainer>
                <AuthorBlock user_id={props.author_id} />
                <ArticleTitleDisplay article_id={props.article_id} />
                <ArticleDescriptionDisplay article_id={props.article_id} />
                <KudosStatsContainer>
                    <KudosStat><span>{props.articleKudos}</span> Kudos</KudosStat>
                    <KudosButton article_id={props.article_id} />
                </KudosStatsContainer>
            </TitleAndDescriptionContainer>
            <ArticleFeatureImageDisplay article_id={props.article_id} />
        </ArticleLayoutContainer>
        <ArticleBodyDisplay article_id={props.article_id} />
        <Wrapper tight>
            {props.isLoggedIn && <ArticleCommentBoxContainer article_id={props.article_id}/>}
            {props.commentIds.map(comment_id => (
                    <Comment comment_id={comment_id} key={comment_id} />
                ))}
        </Wrapper>
    </div>
);

Article.propTypes = {
    article_id: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    articleKudos: PropTypes.number.isRequired,
    isInline: PropTypes.bool.isRequired,
    commentIds: PropTypes.arrayOf(PropTypes.string),
    isLoggedIn: PropTypes.bool.isRequired,
    isAuthor: PropTypes.bool.isRequired
};

export default Article;