import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { 
    Editor, 
    EditorState, 
    convertFromRaw, 
    convertToRaw, 
    RichUtils, 
    CompositeDecorator, 
    DefaultDraftBlockRenderMap 
} from 'draft-js';
import CustomCodeBlockWrapper from './CustomCodeBlockWrapper';
import LinkDecorator from './LinkDecorator';
import EditorControls from './EditorControls';

const Immutable = require('immutable');

/*
props passed from parent
submitCallback - callback function, sig - handleSubmit => commentData
cancelCallback - callback function, no arguments, just toggles a boolean in parents state.
isCancellable - boolean to indicate if we can cancel it
optionalComment_id - the _id
*/


const EditorContainer = styled.div`
    background-color: #eee;
    border: solid 2px #ddd;
    border-radius: 3px;
    position: relative;
`;

const EditorInnerContainer = styled.div`
    min-height: 160px;
    cursor: text;
`;

/*
    Custom blockRenderMap declared. This controls the element and wrapper element that are rendered when
    a specific blockType is selected. Is then merged with the default map so we don't lose any of the 
    default mappings (except the ones we purposefully want to override).
*/
const blockRenderMap = Immutable.Map({
    'code-block': { element: 'pre', wrapper: <CustomCodeBlockWrapper />}
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

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

const styleMap = {
    'SUPERSCRIPT': {
        verticalAlign: 'super',
        fontSize: 'smaller',
        lineHeight: 'normal'
    }
};

class CommentEditor extends Component {
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
        if (this.props.optionalComment_id) {
            console.log(this.props.comments[this.props.optionalComment_id].text);
            initialEditorState = convertFromRaw(
                this.props.comments[this.props.optionalComment_id].text
            );
        } else {
            initialEditorState = emptyContentState;
        }
        this.state = {
            editorState: EditorState.createWithContent(initialEditorState, this.decorator),
            linkUrl: '',
            linkMenuIsOpen: false
        };
        this.createLinkEntity = this.createLinkEntity.bind(this);
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.updateLinkUrl = this.updateLinkUrl.bind(this);
        this.onChange = editorState => this.setState({editorState});
        this.toggleCode = this.toggleCode.bind(this);
        this.changeBlockType = this.changeBlockType.bind(this);
        this.focusEditor = this.focusEditor.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.exportRaw = this.exportRaw.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.toggleLinkMenu = this.toggleLinkMenu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearEditor = this.clearEditor.bind(this);
    }

    componentDidMount() {
        this.focusEditor();
    }

    focusEditor() {
        this.domEditor.focus();
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
            case 'header-two':
                return 'comment-editor__h2';
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

    exportRaw() {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        this.props.storeComment(raw);
    }

    handleSubmit() {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const raw = convertToRaw(currentContent);
        this.props.submitCallback(raw, this.clearEditor);
    }

    render() {
        return (
            <EditorContainer>
                <EditorInnerContainer onClick={this.focusEditor}>
                    <Editor
                        editorKey="editor"
                        editorState={this.state.editorState} 
                        onChange={this.onChange}
                        placeholder="Join the discussion..."
                        ref={this.setEditorRef}
                        blockStyleFn={this.customBlockStyles}
                        handleKeyCommand={this.handleKeyCommand}
                        blockRenderMap={extendedBlockRenderMap}
                        customStyleMap={styleMap}
                    />
                </EditorInnerContainer>
                <EditorControls 
                    editorState={this.state.editorState}
                    toggleInlineStyle={this.toggleInlineStyle}
                    toggleCode={this.toggleCode}
                    changeBlockType={this.changeBlockType}
                    linkMenuIsOpen={this.state.linkMenuIsOpen}
                    linkUrl={this.state.linkUrl}
                    updateLinkUrl={this.updateLinkUrl}
                    toggleLinkMenu={this.toggleLinkMenu}
                    createLink={this.createLinkEntity}
                    isCancellable={this.props.isCancellable}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.props.cancelCallback}
                />
            </EditorContainer>
        );
    }
}


const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(
    mapStateToProps
)(CommentEditor);