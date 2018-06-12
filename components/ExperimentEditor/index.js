import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions'
import styled, { injectGlobal } from 'styled-components';
import { 
    Editor, 
    EditorState, 
    convertFromRaw, 
    convertToRaw, 
    RichUtils, 
    CompositeDecorator, 
    DefaultDraftBlockRenderMap,
    AtomicBlockUtils
} from 'draft-js';
import LinkDecorator from './LinkDecorator';
import ExperimentEditor from './ExperimentEditor';
import ImageBlock from './ImageBlock';

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

const Image = props => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const { src } = entity.getData();
    return (
        <img src={src} />
    );
}

function blockRendererFn(block) {
    if (block.getType() === 'atomic') {
        return {
            component: ImageBlock,
            editable: true
        };
    }
    return null;
}

export class ExperimentEditorContainer extends Component {
    constructor(props) {
        super(props);
        this.setEditorRef = ref => this.domEditor = ref;
        this.imageFileInput = React.createRef();
        this.decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        let initialEditorState;
        let initialTitleState = '';
        let initialDescriptionState = '';
        let initialCategoryState = '';
        let initialImageState = null;
        if (this.props.article_id) {
            const thisArticle = this.props.articles[this.props.article_id];
            initialEditorState = convertFromRaw(thisArticle.text);
            initialTitleState = thisArticle.title;
            initialDescription = thisArticle.description;
            initialCategoryState = thisArticle.category;
        } else {
            initialEditorState = emptyContentState;
        }
        this.state = {
            editorState: EditorState.createWithContent(initialEditorState, this.decorator),
            linkUrl: '',
            linkMenuIsOpen: false,
            articleTitle: initialTitleState,
            articleDescription: initialDescriptionState,
            articleCategory: initialCategoryState,
            articleImage: initialImageState,
            imageUploadStatus: 'Please select an image'
        };
        this.getEditorState = () => this.state.editorState;
        this.createLinkEntity = this.createLinkEntity.bind(this);
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.updateLinkUrl = this.updateLinkUrl.bind(this);
        this.onChange = editorState => this.setState({editorState});
        this.toggleCode = this.toggleCode.bind(this);
        this.changeBlockType = this.changeBlockType.bind(this);
        this.focusEditor = this.focusEditor.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.toggleLinkMenu = this.toggleLinkMenu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearEditor = this.clearEditor.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.checkForFile = this.checkForFile.bind(this);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.addImageBlock = this.addImageBlock.bind(this);
        this.logRaw = this.logRaw.bind(this);
        this.blockRendererFn = this.blockRendererFn.bind(this);
    }

    componentDidMount() {
        this.focusEditor();
    }

    focusEditor() {
        this.domEditor.focus();
    }

    blockRendererFn(block) {
        if (block.getType() === 'atomic') {
            return {
                component: ImageBlock,
                editable: true,
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

    checkForFile() {
        const imageFile = this.imageFileInput.current.files[0];
        if (imageFile) {
            //console.log(imageFile);
            this.image = imageFile;
            this.setState({
                imageUploadStatus: imageFile.name
            });
        }
    }

    clearEditor() {
        this.onChange(EditorState.createWithContent(emptyContentState, this.decorator));
    }

    toggleLinkMenu(e) {
        if (e.button === 0) {
            e.preventDefault();
            this.setState({ 
                linkMenuIsOpen: !this.state.linkMenuIsOpen
            });
        }
    }

    handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.setState({ editorState: newState });
            return true;
        }
        return false;
    }

    toggleInlineStyle(style) {
        return (e) => {
            if (e.button === 0) {
                e.preventDefault();
                this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
            }
        }
    }

    toggleCode(e) {
        if (e.button === 0) {
            e.preventDefault();
            this.onChange(RichUtils.toggleCode(this.state.editorState));
        }
    }

    addImageBlock() {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            { src: '', caption: 'A caption to accompany the image.', fullWidth: true }
        );
        // http://192.168.1.67:5000/dark-high-fantasy-rec-post-image.jpg
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        //console.log(newEditorState);
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            )
        })
    }

    createLinkEntity() {
        const { editorState, linkUrl } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: linkUrl}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            linkUrl: '',
            linkMenuIsOpen: false
        });
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
                return 'comment-editor__block-quote';
        }
    }

    updateLinkUrl(e) {
        this.setState({ linkUrl: e.target.value });
    }

    changeBlockType(blockType) {
        return (e) => {
            if (e.button === 0) {
                e.preventDefault();
                this.setState({
                    editorState: RichUtils.toggleBlockType(this.state.editorState, blockType)
                });
            } 
        }
    }

    logRaw() {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        console.log(raw);
    }

    handleSubmit() {
        const { 
            editorState, 
            articleTitle, 
            articleDescription, 
            articleCategory,
            articleImage    
        } = this.state;
        if (!articleTitle || !articleDescription || !articleCategory || !this.image) {
            console.log('Please fill out all fields');
            return;
        }
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        const stringifiedRaw = JSON.stringify(raw);
        const form = new FormData();
        form.append('title', articleTitle);
        form.append('description', articleDescription);
        form.append('category', articleCategory);
        form.append('text', stringifiedRaw);
        form.append('image', this.image);
        if (this.props.isNewArticle) {
            this.props.createPost(form, this.props.currentUser_id, this.props.token);
        } else {
            this.props.editPost(
                form, 
                this.props.article_id,
                this.props.articles[this.props.article_id].category,
                articleCategory,
                this.props.token
            );
        }
    }

    handleTitleUpdate(e) {
        this.setState({ articleTitle: e.target.value });
    }

    render() {
        return (
            <ExperimentEditor 
                editorState={this.state.editorState}
                onChange={this.onChange}
                setEditorRef={this.setEditorRef}
                customBlockStyles={this.customBlockStyles}
                handleKeyCommand={this.handleKeyCommand}
                toggleInlineStyle={this.toggleInlineStyle}
                toggleCode={this.toggleCode}
                changeBlockType={this.changeBlockType}
                linkMenuIsOpen={this.state.linkMenuIsOpen}
                linkUrl={this.state.linkUrl}
                updateLinkUrl={this.updateLinkUrl}
                toggleLinkMenu={this.toggleLinkMenu}
                createLinkEntity={this.createLinkEntity}
                handleSubmit={this.handleSubmit}
                articleTitle={this.state.articleTitle}
                articleDescription={this.state.articleDescription}
                articleCategory={this.state.articleCategory}
                articleImage={this.state.articleImage}
                handleTitleUpdate={this.handleTitleUpdate}
                handleDescriptionUpdate={this.handleFieldUpdate('articleDescription')}
                handleCategoryUpdate={this.handleFieldUpdate('articleCategory')}
                imageFileInputRef={this.imageFileInput}
                checkForFile={this.checkForFile}
                focusEditor={this.focusEditor}
                imageUploadStatus={this.state.imageUploadStatus}
                addImageBlock={this.addImageBlock}
                blockRendererFn={this.blockRendererFn}
                logRaw={this.logRaw}
            />
        );
    }
}

ExperimentEditorContainer.propTypes = {
    article_id: PropTypes.string,
    isNewArticle: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    articles: state.posts.models,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    {
        createPost: ActionCreators.createPost,
        editPost: ActionCreators.editPost
    }
)(ExperimentEditorContainer);