import React, { Component } from 'react';
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
    AtomicBlockUtils
} from 'draft-js';
import LinkDecorator from './LinkDecorator';
import ArticleEditor from './ArticleEditor';
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


export class ArticleEditorContainer extends Component {
    constructor(props) {
        super(props);
        this.setEditorRef = ref => this.domEditor = ref;
        this.decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        let initialEditorState;
        let initialTitleState = '';
        let initialDescriptionState = '';
        let initialCategoryState = 'javascript';
        let initialImageState = null;
        if (this.props.article_id) {
            const thisArticle = this.props.articles[this.props.article_id];
            initialEditorState = convertFromRaw(thisArticle.text);
            initialCategoryState = thisArticle.category;
        } else {
            initialEditorState = emptyContentState;
        }
        this.state = {
            editorState: EditorState.createWithContent(initialEditorState, this.decorator),
            linkUrl: '',
            linkMenuIsOpen: false,
            articleCategory: initialCategoryState
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
        //this.checkForFile = this.checkForFile.bind(this);
        //this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
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

    updateLinkUrl(e) {
        this.setState({ linkUrl: e.target.value });
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
            { src: '', fullWidth: true }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
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
        const title = raw.blocks.find(block => block.type === 'header-one');
        const description = raw.blocks.find(block => block.type === 'header-two');
        let image;
        for (const key in raw.entityMap) {
            if (raw.entityMap[key].type === 'IMAGE') {
                image = raw.entityMap[key].data.src;
            }
        }
        if (!title || !description || !image) {
            console.log("Either a title, description or image were not provided. This doesn't pass validation.");
            return;
        }
        console.log(title);
        console.log(description);
        console.log(image);
        console.log(raw);
        //console.log(raw);
    }

    handleSubmit() {
        const { editorState, articleCategory } = this.state;
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
        if (!title || !description || !articleCategory || !image) {
            console.log("this did not pass validation");
            return;
        }
        const stringifiedRaw = JSON.stringify(raw);
        const stringifiedTitle = JSON.stringify(title);
        const stringifiedDescription = JSON.stringify(description);
        const form = new FormData();
        form.append('title', stringifiedTitle);
        form.append('description', stringifiedDescription);
        form.append('category', articleCategory);
        form.append('text', stringifiedRaw);
        form.append('image', image);
        const articleObject = {
            title: stringifiedTitle,
            description: stringifiedDescription,
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
                articleCategory={this.state.articleCategory}
                handleCategoryUpdate={this.handleFieldUpdate('articleCategory')}
                focusEditor={this.focusEditor}
                addImageBlock={this.addImageBlock}
                blockRendererFn={this.blockRendererFn}
                logRaw={this.logRaw}
            />
        );
    }
}

ArticleEditorContainer.propTypes = {
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
)(ArticleEditorContainer);