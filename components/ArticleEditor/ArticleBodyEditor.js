import React, { Component } from 'react';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions'
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
import { 
    LinkDecorator, 
    ImageBlock, 
    CustomCodeBlockWrapper, 
    CenteredBlockWrapper ,
    CustomBlockQuoteWrapper,
    CustomOrderedListBlockWrapper,
    CustomUnorderedListBlockWrapper
} from '../ArticleSharedComponents';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
const Immutable = require('immutable');

const EditorModuleOuterContainer = styled.div`
    padding: 16px;
`;

const EditorModuleInnerContainer = styled.div`
    background-color: ${styleConstants.colorSecondary};
    border-radius: 3px;
    position: relative;
`;

const EditorTextBoxContainer = styled.div`
    min-height: 160px;
    cursor: text;
`;


/*
    Custom blockRenderMap declared. This controls the element and wrapper element that are rendered when
    a specific blockType is selected. Is then merged with the default map so we don't lose any of the 
    default mappings (except the ones we purposefully want to override).
*/
const blockRenderMap = Immutable.Map({
    'code-block': { element: 'pre', wrapper: <CustomCodeBlockWrapper />},
    'unstyled': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'header-one': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'header-two': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'block-quote': { element: 'div', wrapper: <CustomBlockQuoteWrapper/> },
    'unordered-list-item': { element: 'li', wrapper: <CustomUnorderedListBlockWrapper/> },
    'ordered-list-item': { element: 'li', wrapper: <CustomOrderedListBlockWrapper/> }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);



const styleMap = {
    'SUPERSCRIPT': {
        verticalAlign: 'super',
        fontSize: 'smaller',
        lineHeight: 'normal'
    }
};

const ArticleEditor = props => (
    <React.Fragment>
        <EditorModuleInnerContainer>
            <EditorTextBoxContainer onClick={props.focusEditor}>
                <Editor
                    editorKey="articleEditor"
                    editorState={props.editorState} 
                    onChange={props.onChange}
                    placeholder="Tell a story..."
                    ref={props.setEditorRef}
                    blockStyleFn={props.customBlockStyles}
                    handleKeyCommand={props.handleKeyCommand}
                    blockRenderMap={extendedBlockRenderMap}
                    customStyleMap={styleMap}
                    blockRendererFn={props.blockRendererFn}
                    handleReturn={props.handleReturn}
                   
                />
            </EditorTextBoxContainer>
            <BlockStyleControls
                editorState={props.editorState}
                toggleCode={props.toggleCode}
                changeBlockType={props.changeBlockType}
                handleSubmit={props.handleSubmit}
                addImageBlock={props.addImageBlock}
                logRaw={props.logRaw}
            />
        </EditorModuleInnerContainer>
        
        <InlineStyleControls 
            getEditorState={props.getEditorState}
            editorState={props.editorState}
            toggleInlineStyle={props.toggleInlineStyle}
            toggleCode={props.toggleCode}
            createLinkEntity={props.createLinkEntity}
            focusEditor={props.focusEditor}
        />
    </React.Fragment>
);

ArticleEditor.propTypes = {
    editorState: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    setEditorRef: PropTypes.func.isRequired,
    customBlockStyles: PropTypes.func.isRequired,
    handleKeyCommand: PropTypes.func.isRequired,
    toggleInlineStyle: PropTypes.func.isRequired,
    toggleCode: PropTypes.func.isRequired,
    changeBlockType: PropTypes.func.isRequired,
    createLinkEntity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    articleCategory: PropTypes.string.isRequired,
    handleCategoryUpdate: PropTypes.func.isRequired,
    focusEditor: PropTypes.func.isRequired
};

/*
    When rendering an empty text editor we have to create this 'placeholder' empty state and use it,
    rather than just using createFromEmpty. This is because using createFromEmpty causes an issue with
    SSR - where the keys for content blocks are created (pseudo)randomly, so when they are created on the
    server and again on the client you get a mismatch. 
*/
const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});

export class ArticleBodyEditorContainer extends Component {
    constructor(props) {
        super(props);
        this.setEditorRef = ref => this.domEditor = ref;
        this.state = { articleCategory: 'javascript' };
        this.getEditorState = () => this.props.editorState;
        this.createLinkEntity = this.createLinkEntity.bind(this);
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.onChange = (editorState, optionalCallback=null) => {
            this.props.updateEditorState(editorState, optionalCallback)
        };
        this.toggleCode = this.toggleCode.bind(this);
        this.changeBlockType = this.changeBlockType.bind(this);
        this.focusEditor = this.focusEditor.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.clearEditor = this.clearEditor.bind(this);
        this.addImageBlock = this.addImageBlock.bind(this);
        this.logRaw = this.logRaw.bind(this);
        this.blockRendererFn = this.blockRendererFn.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    componentDidMount() {
        this.focusEditor();
    }

    focusEditor() {
        this.domEditor.focus();
    }

    handleReturn(e) {
        const { editorState } = this.props;
        const currentContent = editorState.getCurrentContent();
        const blockMap = currentContent.getBlockMap();
        const currentSelection = editorState.getSelection();
        const currentBlockKey = currentSelection.getAnchorKey();
        const currentBlock = currentContent.getBlockForKey(currentBlockKey);
        if (e.shiftKey) {
            this.onChange(
                RichUtils.insertSoftNewline(editorState)
            );
            return 'handled';
        }
        return 'not-handled';
    }

    blockRendererFn(block) {
        if (block.getType() === 'atomic') {
            return {
                component: ImageBlock,
                editable: false,
                props: {
                    getEditorState: this.getEditorState,
                    setEditorState: this.onChange
                }
            };
        }
        return null;
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName] : e.target.value });    
        }
    }

    clearEditor() {
        //this.onChange(EditorState.createWithContent(emptyContentState, this.decorator));
    }

    handleKeyCommand(command) {
        const { editorState } = this.props;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    toggleInlineStyle(style) {
        return (e) => {
            if (e.button === 0) {
                e.preventDefault();
                this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style));
            }
        }
    }

    toggleCode(e) {
        if (e.button === 0) {
            e.preventDefault();
            this.onChange(RichUtils.toggleCode(this.props.editorState));
        }
    }

    addImageBlock(imagesObject) {
        const { editorState } = this.props;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            { images: imagesObject, fullWidth: true }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.onChange(
            AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            )
        );
    }

    createLinkEntity(linkUrl) {
        const { editorState } = this.props;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: linkUrl}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.onChange(
            RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ), this.focusEditor
        );
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

    customBlockStyles(contentBlock) {
        const type = contentBlock.getType();
        switch (type) {
            case 'unstyled':
                return 'comment-editor__unstyled';
            case 'code-block':
                return 'comment-editor__code-block';
            case 'unordered-list-item':
                return 'comment-editor__ul-item';
            case 'ordered-list-item':
                return 'comment-editor__ol-item';
            case 'block-quote':
                return 'article-editor__block-quote';
            case 'header-one':
                return 'comment-editor__h1';
            case 'header-two':
                return 'comment-editor__h2';
        }
    }

    changeBlockType(blockType) {
        return (e) => {
            if (e.button === 0) {
                e.preventDefault();
                this.onChange(
                    RichUtils.toggleBlockType(this.props.editorState, blockType)
                );
            } 
        }
    }

    logRaw() {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        const title = raw.blocks.find(block => block.type === 'header-one');
        const description = raw.blocks.find(block => block.type === 'header-two');
        let image;
        for (const key in raw.entityMap) {
            if (raw.entityMap[key].type === 'IMAGE') {
                image = raw.entityMap[key].data.src;
            }
        }
        console.log(currentContent);
        console.log(raw);
    }

    render() {
        return (
            <ArticleEditor 
                editorState={this.props.editorState}
                onChange={this.onChange}
                setEditorRef={this.setEditorRef}
                customBlockStyles={this.customBlockStyles}
                handleKeyCommand={this.handleKeyCommand}
                toggleInlineStyle={this.toggleInlineStyle}
                toggleCode={this.toggleCode}
                changeBlockType={this.changeBlockType}
                createLinkEntity={this.createLinkEntity}
                handleSubmit={this.props.handleSubmit}
                articleCategory={this.state.articleCategory}
                handleCategoryUpdate={this.handleFieldUpdate('articleCategory')}
                focusEditor={this.focusEditor}
                addImageBlock={this.addImageBlock}
                blockRendererFn={this.blockRendererFn}
                logRaw={this.logRaw}
                handleReturn={this.handleReturn}
                getEditorState={this.getEditorState}
                createLinkEntity={this.createLinkEntity}
            />
        );
    }
}

ArticleBodyEditorContainer.propTypes = {
    article_id: PropTypes.string,
    isNewArticle: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    articles: state.posts.models,
    currentUser_id: state.currentUser._id,
});

export default connect(
    mapStateToProps, 
    {
        createPost: ActionCreators.createPost,
        editPost: ActionCreators.editPost
    }
)(ArticleBodyEditorContainer);