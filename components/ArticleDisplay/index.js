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
import ArticleDisplay from './ArticleDisplay';
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


export class ArticleDisplayContainer extends Component {
    constructor(props) {
        super(props);
        this.decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        let initialEditorState;
        if (this.props.article_id) {
            const thisArticle = this.props.articles[this.props.article_id];
            initialEditorState = convertFromRaw(thisArticle.text);
        } else {
            initialEditorState = emptyContentState;
        }
        this.state = {
            editorState: EditorState.createWithContent(initialEditorState, this.decorator),
        };
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.onChange = editorState => this.setState({editorState});
        this.blockRendererFn = this.blockRendererFn.bind(this);
    }

    blockRendererFn(block) {
        if (block.getType() === 'atomic') {
            return {
                component: ImageBlock,
                editable: false
            };
        }
        return null;
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

    render() {
        return (
            <ArticleDisplay 
                editorState={this.state.editorState}
                onChange={this.onChange}
                customBlockStyles={this.customBlockStyles}
                blockRendererFn={this.blockRendererFn}
            />
        );
    }
}

ArticleDisplayContainer.propTypes = {
    article_id: PropTypes.string,
    isNewArticle: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    articles: state.posts.models,
    currentUser_id: state.currentUser._id,
    token: state.currentUser.token
});

export default connect(mapStateToProps)(ArticleDisplayContainer);