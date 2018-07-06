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

const BorderedContainer = styled.div`
    padding: 16px;
    border: solid 2px #eee;
    position: relative;
    margin-top: 16px;
    margin-bottom: 16px;
`;

const ArticleTitleEditor = props => (
    <BorderedContainer
        onClick={props.focusEditor}
    >
        <Editor 
            editorKey="articleTitleEditor"
            editorState={props.editorState} 
            onChange={props.onChange}
            placeholder="Add a title..."
            ref={props.setEditorRef}
            blockStyleFn={props.customBlockStyles}
            handleKeyCommand={props.handleKeyCommand}
            handleReturn={props.handleReturn}
        />
    </BorderedContainer>
);

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
            key: 'articleTitleBlock',
            type: 'header-one',
            entityRanges: [],
        },
    ],
});


export class ArticleTitleEditorContainer extends Component {

    static propTypes = {
        article_id: PropTypes.string,
        isNewArticle: PropTypes.bool.isRequired,
        articles: PropTypes.object.isRequired,
        currentUser_id: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.setEditorRef = ref => this.domEditor = ref;
        this.onChange = (editorState) => {
            this.props.updateEditorState(editorState);
        }
        this.focusEditor = this.focusEditor.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.clearEditor = this.clearEditor.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    componentDidMount() {
        this.focusEditor();
    }

    focusEditor() {
        this.domEditor.focus();
    }

    handleReturn(e) {
        // For now I just want to prevent any action from triggering when enter is pressed,
        // however eventually I will probably implement logic to switch focus over to a
        // different component on enter.
        return 'handled';
    }

    clearEditor() {
        this.onChange(EditorState.createWithContent(emptyContentState, this.decorator));
    }

    handleKeyCommand(command) {
        const { editorState } = this.props;
        if (command === 'backspace') {
            const currentContent = editorState.getCurrentContent();
            const block = currentContent.getBlockForKey('articleTitleBlock');
            const blockText = block.getText();
            if (blockText === '') {
                return true;
            }
        }
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    customBlockStyles(contentBlock) {
        const type = contentBlock.getType();
        switch (type) {
            case 'header-one':
                return 'article-editor__h1';
        }
    }

    render() {
        return (
            <ArticleTitleEditor 
                editorState={this.props.editorState}
                onChange={this.onChange}
                setEditorRef={this.setEditorRef}
                customBlockStyles={this.customBlockStyles}
                handleKeyCommand={this.handleKeyCommand}
                handleSubmit={this.handleSubmit}
                focusEditor={this.focusEditor}
                logRaw={this.logRaw}
                handleReturn={this.handleReturn}
            />
        );
    }
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
)(ArticleTitleEditorContainer);
