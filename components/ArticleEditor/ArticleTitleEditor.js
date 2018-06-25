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
    border: solid 2px ${styleConstants.colorBodyText};
    padding: 16px;
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
        currentUser_id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.setEditorRef = ref => this.domEditor = ref;
        // let initialEditorState;
        // if (this.props.article_id) {
        //     const thisArticle = this.props.articles[this.props.article_id];
        //     initialEditorState = convertFromRaw(thisArticle.text);
        // } else {
        //     initialEditorState = emptyContentState;
        // }
        // this.state = {
        //     editorState: EditorState.createWithContent(initialEditorState)
        // };
        // this.onChange = (editorState) => {
        //     //console.log('onChange event fired');
        //     //console.log(editorState);
        //     const currentContent = editorState.getCurrentContent();
        //     const block = currentContent.getBlockForKey('articleTitleBlock');
        //     if (!block) {
        //         return;
        //     }
        //     const blockType = block.getType();
        //     //console.log(block);
        //     if (blockType !== 'header-one') {
        //         return;
        //     }
        //     this.setState({ editorState });
        // }
        this.onChange = (editorState) => {
            this.props.updateEditorState(editorState);
        }
        this.focusEditor = this.focusEditor.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        //const { editorState } = this.state;
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
            //this.setState({ editorState: newState });
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
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    {
        createPost: ActionCreators.createPost,
        editPost: ActionCreators.editPost
    }
)(ArticleTitleEditorContainer);