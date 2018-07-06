import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import ArticleTitleEditor from './ArticleTitleEditor';
import ArticleDescriptionEditor from './ArticleDescriptionEditor';
import ArticleBodyEditor from './ArticleBodyEditor';
import ArticleImageEditor from './ArticleImageEditor';
import AuthorBlock from '../AuthorBlock';
import ArticleCategoryEditor from './ArticleCategoryEditor';
import { LinkDecorator } from '../ArticleSharedComponents';
import KudosButton from '../KudosButton';
import { 
    Editor, 
    EditorState, 
    convertFromRaw, 
    convertToRaw, 
    RichUtils, 
    CompositeDecorator, 
    DefaultDraftBlockRenderMap,
    AtomicBlockUtils,
    Modifier,
    EditorBlock
} from 'draft-js';

const emptyTitleContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'articleTitleBlock',
            type: 'header-one',
            entityRanges: [],
        },
    ],
});

const emptyDescriptionContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'articleDescriptionBlock',
            type: 'header-two',
            entityRanges: [],
        },
    ],
});

const emptyBodyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'articleBodyEditor',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});

const TitleAndDescriptionContainer = styled.div`
    width: 100%;
    max-width: 832px;
    margin-left: auto;
    margin-right: auto;
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

const LayoutButtonsContainer = styled.div`
    text-align: center;
    padding: 16px;
`;

const LayoutButton = styled.button`
    font-family: ${styleConstants.fontSecondary};
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.isActive ? styleConstants.colorSecondary : styleConstants.colorPrimary};
    background-color: ${props => props.isActive ? styleConstants.colorPrimary : styleConstants.colorSecondary};
    padding: 8px 16px;
    border-radius: 3px;
    border: solid 2px;
    border-color: ${styleConstants.colorPrimary};
    cursor: pointer;
    && {
        margin-right: 8px;
    }
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


class ArticleEditorContainer extends Component {
    
    static propTypes = {
        isNewArticle: PropTypes.bool.isRequired,
        article_id: PropTypes.string,
        articles: PropTypes.object.isRequired,
        currentUser_id: PropTypes.string.isRequired
    }
    
    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateBody = this.updateBody.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.makeSingleColumn = this.makeSingleColumn.bind(this);
        this.makeInline = this.makeInline.bind(this);
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRaw = this.getRaw.bind(this);
        this.decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        let initialTitleEditorState = emptyTitleContentState;
        let initialDescriptionEditorState = emptyDescriptionContentState;
        let initialBodyEditorState = emptyBodyContentState;
        let initialImageEditorState = {};
        let initialIsInline = false;
        let initialArticleCategory = 'javascript';
        if (!this.props.isNewArticle) {
            this.article = this.props.articles[this.props.article_id];
            initialTitleEditorState = convertFromRaw(this.article.titleRaw);
            initialDescriptionEditorState = convertFromRaw(this.article.descriptionRaw);
            initialBodyEditorState = convertFromRaw(this.article.bodyRaw);
            initialImageEditorState = this.article.image;
            initialIsInline = this.article.isInline;
            initialArticleCategory = this.article.category;
        }
        this.state = {
            titleEditorState: EditorState.createWithContent(initialTitleEditorState),
            descriptionEditorState: EditorState.createWithContent(initialDescriptionEditorState),
            bodyEditorState: EditorState.createWithContent(initialBodyEditorState, this.decorator),
            imageEditorState: initialImageEditorState,
            isInline: initialIsInline,
            articleCategory: initialArticleCategory
        };
    }

    updateTitle(newEditorState) {
        this.setState({ titleEditorState: newEditorState });
    }

    updateDescription(newEditorState) {
        this.setState({ descriptionEditorState: newEditorState });
    }

    updateBody(newEditorState, optionalCallback=null) {
        this.setState({ bodyEditorState: newEditorState }, () => {
            if (optionalCallback) {
                optionalCallback();
            }
        });
    }

    updateImage(newImageObject) {
        this.setState({ imageEditorState: newImageObject });
    }

    updateCategory(newCategory) {
        console.log(newCategory);
        this.setState({ articleCategory: newCategory });
    }

    makeSingleColumn() {
        this.setState({ isInline: false });
    }

    makeInline() {
        this.setState({ isInline: true });
    }

    findLinkEntities(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
            character => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === 'LINK'
                );
            },
            callback
        );
    }

    getRaw(editorState) {
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        return raw;
    }

    handleSubmit() {
        const {
            titleEditorState,
            descriptionEditorState,
            bodyEditorState,
            imageEditorState,
            isInline,
            articleCategory
        } = this.state;
        const titleRaw = this.getRaw(titleEditorState);
        const titleText = titleRaw.blocks[0].text;
        const descriptionRaw = this.getRaw(descriptionEditorState);
        const descriptionText = descriptionRaw.blocks[0].text;
        const bodyRaw = this.getRaw(bodyEditorState);
        // there should be validation here but I am skipping this for now
        const articleObject = {
            titleText: titleText,
            titleRaw: titleRaw,
            descriptionText: descriptionText,
            descriptionRaw: descriptionRaw,
            image: imageEditorState,
            bodyRaw: bodyRaw,
            category: articleCategory,
            isInline: isInline
        };
        if (this.props.isNewArticle) {
            this.props.createPost(articleObject, this.props.currentUser_id);
        } else {
            this.props.editPost(
                articleObject, 
                this.props.article_id, 
                this.article.category, 
                articleCategory
            );
        }
    }

    render() {
        return (
            <div>
                <LayoutButtonsContainer>
                    <LayoutButton
                        onClick={this.makeSingleColumn}
                        isActive={this.state.isInline === false}
                    >
                        Single Column
                    </LayoutButton>
                    <LayoutButton
                        onClick={this.makeInline}
                        isActive={this.state.isInline === true}
                    >
                        Inline
                    </LayoutButton>
                </LayoutButtonsContainer>
                <ArticleCategoryEditor 
                    editorState={this.state.articleCategory}
                    updateEditorState={this.updateCategory}
                />
                <ArticleLayoutContainer isInlineLayout={this.state.isInline}>
                    <TitleAndDescriptionContainer>
                        <AuthorBlock user_id={this.props.currentUser_id} />
                        <ArticleTitleEditor 
                            isNewArticle={this.props.isNewArticle} 
                            updateEditorState={this.updateTitle}
                            editorState={this.state.titleEditorState}
                        />
                        <ArticleDescriptionEditor 
                            isNewArticle={this.props.isNewArticle} 
                            updateEditorState={this.updateDescription}
                            editorState={this.state.descriptionEditorState}
                        />
                        {
                            !this.props.isNewArticle && 
                            <KudosStatsContainer>
                                <KudosStat><span>{this.article.kudos}</span> Kudos</KudosStat>
                            </KudosStatsContainer>
                        }
                    </TitleAndDescriptionContainer>
                    <ArticleImageEditor 
                        isNewArticle={this.props.isNewArticle}
                        updateEditorState={this.updateImage}
                        editorState={this.state.imageEditorState}
                    />
                </ArticleLayoutContainer>
                <ArticleBodyEditor 
                    isNewArticle={this.props.isNewArticle}
                    updateEditorState={this.updateBody}
                    editorState={this.state.bodyEditorState}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser_id: state.currentUser._id,
    articles: state.posts.models
});

export default connect(
    mapStateToProps,
    {
        createPost: ActionCreators.createPost,
        editPost: ActionCreators.editPost
    }
)(ArticleEditorContainer);