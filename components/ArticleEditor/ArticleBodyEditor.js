import React, { Component } from 'react';
import styled from 'styled-components';
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
import LinkDecorator from './LinkDecorator';
import ArticleEditor from './ArticleEditor';
import ImageBlock from './ImageBlock';
import NewImageBlock from './NewImageBlock';

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
        // this.onChange = (editorState, optionalCallback=null) => {
        //     this.setState({ editorState }, () => {
        //         if (optionalCallback) {
        //             optionalCallback();
        //         }
        //     });
        // }
        this.onChange = (editorState, optionalCallback=null) => {
            this.props.updateEditorState(editorState, optionalCallback)
        };
        this.toggleCode = this.toggleCode.bind(this);
        this.changeBlockType = this.changeBlockType.bind(this);
        this.focusEditor = this.focusEditor.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearEditor = this.clearEditor.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
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
        //const { editorState } = this.state;
        const { editorState } = this.props;
        //console.log(e.shiftKey);
        //console.log(RichUtils.getCurrentBlockType(editorState));
        const currentContent = editorState.getCurrentContent();
        const blockMap = currentContent.getBlockMap();
        const currentSelection = editorState.getSelection();
        const currentBlockKey = currentSelection.getAnchorKey();
        const currentBlock = currentContent.getBlockForKey(currentBlockKey);

        console.log(currentBlock);
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
        //const { editorState } = this.state;
        const { editorState } = this.props;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            //this.setState({ editorState: newState });
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

    // addImageBlock() {
    //     const { editorState } = this.state;
    //     const contentState = editorState.getCurrentContent();
    //     const contentStateWithEntity = contentState.createEntity(
    //         'IMAGE',
    //         'IMMUTABLE',
    //         { images: {original: {imageUrl: 'http://localhost:5000/model.jpg'}}, fullWidth: true }
    //     );
    //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    //     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    //     this.setState({
    //         editorState: AtomicBlockUtils.insertAtomicBlock(
    //             newEditorState,
    //             entityKey,
    //             ' '
    //         )
    //     })
    // }

    addImageBlock(imagesObject) {
        //const { editorState } = this.state;
        const { editorState } = this.props;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            { images: imagesObject, fullWidth: true }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        // this.setState({
        //     editorState: AtomicBlockUtils.insertAtomicBlock(
        //         newEditorState,
        //         entityKey,
        //         ' '
        //     )
        // })
        this.onChange(
            AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            )
        );
    }

    // addImageBlock() {
    //     const { editorState } = this.state;
    //     const contentState = editorState.getCurrentContent();
    //     const currentSelection = editorState.getSelection();
    //     const currentKey = currentSelection.getStartKey();
    //     const currentBlock = contentState.getBlockForKey(currentKey);
    //     const contentStateWithUpdatedBlockType = Modifier.setBlockType(
    //         contentState,
    //         currentSelection,
    //         'atomic'
    //     );
    //     const contentStateWithUpdatedBlockData = Modifier.setBlockData(
    //         contentStateWithUpdatedBlockType,
    //         currentSelection, 
    //         {
    //             images: {
    //                 //original: { imageUrl: 'https://imaginaryurl.com' }
    //             },
    //             fullWidth: true
    //         }
    //     );
    //     const newEditorState = EditorState.push(
    //         editorState,
    //         contentStateWithUpdatedBlockData,
    //         'change-block-type'
    //     );
    //     this.onChange(newEditorState);
    // }

    createLinkEntity(linkUrl) {
        //const { editorState } = this.state;
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
                // this.setState({
                //     editorState: RichUtils.toggleBlockType(this.props.editorState, blockType)
                // });
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
        // if (!title || !description || !image) {
        //     console.log("Either a title, description or image were not provided. This doesn't pass validation.");
        //     return;
        // }
        // console.log(title);
        // console.log(description);
        // console.log(image);
        console.log(currentContent);
        console.log(raw);
        //console.log(raw);
    }

    handleSubmit() {
        const { editorState, articleCategory } = this.state;
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        const title = raw.blocks.find(block => block.type === 'header-one').text;
        const description = raw.blocks.find(block => block.type === 'header-two').text;
        let image;
        for (const key in raw.entityMap) {
            if (raw.entityMap[key].type === 'IMAGE') {
                image = raw.entityMap[key].data.images.card.imageUrl;
            }
        }
        if (!title || !description || !articleCategory || !image) {
            console.log("this did not pass validation");
            return;
        }
        const stringifiedRaw = JSON.stringify(raw);
        const articleObject = {
            title: title,
            description: description,
            category: articleCategory,
            text: stringifiedRaw,
            image: image
        }
        if (this.props.isNewArticle) {
            this.props.createPost(articleObject, this.props.currentUser_id, this.props.token);
        } else {
            this.props.editPost(
                articleObject, 
                this.props.article_id,
                this.props.articles[this.props.article_id].category,
                articleCategory,
                this.props.token
            );
        }
    }

    // handleSubmit() {
    //     const { 
    //         editorState, 
    //         articleTitle, 
    //         articleDescription, 
    //         articleCategory,
    //         articleImage    
    //     } = this.state;
    //     if (!articleTitle || !articleDescription || !articleCategory || !this.image) {
    //         console.log('Please fill out all fields');
    //         return;
    //     }
    //     const currentContent = editorState.getCurrentContent();
    //     const raw = convertToRaw(currentContent);
    //     const stringifiedRaw = JSON.stringify(raw);
    //     const form = new FormData();
    //     form.append('title', articleTitle);
    //     form.append('description', articleDescription);
    //     form.append('category', articleCategory);
    //     form.append('text', stringifiedRaw);
    //     form.append('image', this.image);
    //     if (this.props.isNewArticle) {
    //         this.props.createPost(form, this.props.currentUser_id, this.props.token);
    //     } else {
    //         this.props.editPost(
    //             form, 
    //             this.props.article_id,
    //             this.props.articles[this.props.article_id].category,
    //             articleCategory,
    //             this.props.token
    //         );
    //     }
    // }

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
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    {
        createPost: ActionCreators.createPost,
        editPost: ActionCreators.editPost
    }
)(ArticleBodyEditorContainer);