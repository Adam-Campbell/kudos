import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import ArticleTitleEditor from './ArticleTitleEditor';
import ArticleDescriptionEditor from './ArticleDescriptionEditor';
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

class TitleAndDescription extends Component {
    
    static propTypes = {
        isNewArticle: PropTypes.bool.isRequired
    }
    
    constructor(props) {
        super(props);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.state = {
            titleEditorState: EditorState.createWithContent(emptyTitleContentState),
            descriptionEditorState: EditorState.createWithContent(emptyDescriptionContentState)
        };
    }

    updateTitle(newEditorState) {
        this.setState({ titleEditorState: newEditorState });
    }

    updateDescription(newEditorState) {
        this.setState({ descriptionEditorState: newEditorState });
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
            </div>
        );
    }
}

export default TitleAndDescription;