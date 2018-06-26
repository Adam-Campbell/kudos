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
import LinkDecorator from './LinkDecorator';
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

class ArticleEditorStateContainer extends Component {
    
    static propTypes = {
        isNewArticle: PropTypes.bool.isRequired
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
        this.state = {
            titleEditorState: EditorState.createWithContent(emptyTitleContentState),
            descriptionEditorState: EditorState.createWithContent(emptyDescriptionContentState),
            bodyEditorState: EditorState.createWithContent(emptyBodyContentState, this.decorator),
            imageEditorState: {},
            isInline: false,
            articleCategory: 'javascript'
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
            titleRaw: JSON.stringify(titleRaw),
            descriptionText: descriptionText,
            descriptionRaw: JSON.stringify(descriptionRaw),
            image: JSON.stringify(imageEditorState),
            bodyRaw: JSON.stringify(bodyRaw),
            category: articleCategory,
            isInline: isInline
        };
        this.props.createPost(articleObject, this.props.currentUser_id, this.props.token);
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
    token: state.currentUser.token,
    currentUser_id: state.currentUser._id
});

export default connect(
    mapStateToProps,
    {
        createPost: ActionCreators.createPost
    }
)(ArticleEditorStateContainer);