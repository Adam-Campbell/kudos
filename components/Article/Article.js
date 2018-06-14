import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as styleConstants from '../styleConstants';
import AuthorBlock from '../AuthorBlock';
import { Wrapper } from '../Layout';
import Comment from '../Comment';
import { AnchorButton } from '../Button';
import Link from 'next/link';
import KudosButton from '../KudosButton';
import ArticleDisplay from '../ArticleDisplay';
import ArticleCommentBoxContainer from './ArticleCommentBoxContainer';

const ArticleOuter = styled.article`

`;

const ArticleIntroContainer = styled.div`
    padding: 8px 16px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
`;

const ArticleHeader = styled.header`
    width: 100%;
`;

const ArticleTitle = styled.h1`
    font-family: ${styleConstants.fontPrimary};
    font-size: 32px;
    color: ${styleConstants.colorBodyText};
`;

const ArticleDescription = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 20px;
    color: ${styleConstants.colorBodyText};
`;

const ArticleFigure = styled.figure`
    margin: 0;
    width: 100%;
`;

const ArticleImage = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => `url('${props.imageUrl}')`};
    width: 100%;
    padding-bottom: 50%;
`;

const ArticleImageCaption = styled.figcaption`
    text-align: center;
    font-family: ${styleConstants.fontSecondary};
    font-size: 14px;
    font-weight: 400;
    color: ${styleConstants.colorBodyText};
    margin-top: 8px;
`;

const ArticleParagraph = styled.p`
    font-family: ${styleConstants.fontSecondary};
    color: ${styleConstants.colorBodyText};
    font-weight: 300;
    line-height: 1.4;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const ArticleQuote = styled.blockquote`
    color: ${styleConstants.colorBodyText};
    border-left: solid 2px;
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 20px;
    padding: 8px 16px;
    margin-top: 32px;
    margin-bottom: 32px;
`;

const ArticleQuoteText = styled.p`
    margin: 0;
    line-height: 1.6;
`;

const EditArticleButton = styled(AnchorButton)`
    margin-bottom: 16px;
`;

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

const Article = props => (
    <ArticleOuter>
        <ArticleIntroContainer tight>
            {props.isAuthor && <Link 
                        passHref 
                        as={`/edit-post/${props.article_id}`} 
                        href={`/edit-post?post=${props.article_id}`}
                    >
                    <EditArticleButton>Edit this article</EditArticleButton>
                </Link>
            }
            <AuthorBlock article_id={props.article_id} />
        </ArticleIntroContainer>
        <section>
            <ArticleDisplay article_id={props.article_id} isNewArticle={false}/>
        </section>
        <section>
            <Wrapper tight>
                {props.isLoggedIn && <ArticleCommentBoxContainer article_id={props.article_id}/>}
                {props.commentIds.map(comment_id => (
                    <Comment comment_id={comment_id} key={comment_id} />
                ))}
            </Wrapper>
        </section>
    </ArticleOuter>
);

Article.propTypes = {
    article_id: PropTypes.string.isRequired,
    articleKudos: PropTypes.number.isRequired,
    commentIds: PropTypes.arrayOf(PropTypes.string),
    isLoggedIn: PropTypes.bool.isRequired,
    isAuthor: PropTypes.bool.isRequired,
}

export default Article;




















// const Article = props => (
//     <ArticleOuter>
//         <ArticleIntroContainer tight>
//             {props.isAuthor && <Link 
//                         passHref 
//                         as={`/edit-post/${props.article_id}`} 
//                         href={`/edit-post?post=${props.article_id}`}
//                     >
//                     <EditArticleButton>Edit this article</EditArticleButton>
//                 </Link>
//             }
//             <AuthorBlock article_id={props.article_id} />
//             <ArticleHeader>
//                 <ArticleTitle>{props.articleTitle}</ArticleTitle>
//                 <ArticleDescription>{props.articleDescription}</ArticleDescription>
//                 <KudosStatsContainer>
//                     <KudosStat><span>{props.articleKudos}</span> Kudos</KudosStat>
//                     <KudosButton article_id={props.article_id} />
//                 </KudosStatsContainer>
//             </ArticleHeader>
//         </ArticleIntroContainer>
//         <section>
//             <Wrapper wide>
//                 <ArticleFigure>
//                     <ArticleImage imageUrl={props.articleImage}/>
//                     <ArticleImageCaption>I haven't added these yet...</ArticleImageCaption>
//                 </ArticleFigure>
//             </Wrapper>
//             <Wrapper tight>
//                 <ArticleParagraph>{props.articleText}</ArticleParagraph>
//                 <ArticleQuote>
//                     <ArticleQuoteText>“This is where my inspirational quotes would go IF I HAD ANY”</ArticleQuoteText>
//                 </ArticleQuote>
//             </Wrapper>
//         </section>
//         <section>
//             <Wrapper tight>
//                 {props.isLoggedIn && <ArticleCommentBoxContainer article_id={props.article_id}/>}
//                 {props.commentIds.map(comment_id => (
//                     <Comment comment_id={comment_id} key={comment_id} />
//                 ))}
//             </Wrapper>
//         </section>
//     </ArticleOuter>
// );