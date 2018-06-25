import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import ArticleTitleEditor from './ArticleTitleEditor';
import ArticleDescriptionEditor from './ArticleDescriptionEditor';
import ArticleBodyEditor from './ArticleBodyEditor';
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

class TitleAndDescription extends Component {
    
    static propTypes = {
        isNewArticle: PropTypes.bool.isRequired
    }
    
    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateBody = this.updateBody.bind(this);
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        this.state = {
            titleEditorState: EditorState.createWithContent(emptyTitleContentState),
            descriptionEditorState: EditorState.createWithContent(emptyDescriptionContentState),
            bodyEditorState: EditorState.createWithContent(emptyBodyContentState, this.decorator)
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

    render() {
        return (
            <div>
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
                <ArticleBodyEditor 
                    isNewArticle={this.props.isNewArticle}
                    updateEditorState={this.updateBody}
                    editorState={this.state.bodyEditorState}
                />
            </div>
        );
    }
}

export default TitleAndDescription;