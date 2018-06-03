import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import * as styleConstants from '../styleConstants';
const Immutable = require('immutable');

const EditorContainer = styled.div`
    position: relative;
`;

const EditorInnerContainer = styled.div`
    min-height: 80px;
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

const styleMap = {
    'SUPERSCRIPT': {
        verticalAlign: 'super',
        fontSize: 'smaller',
        lineHeight: 'normal'
    }
};

class CommentDisplay extends Component {
    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        const comment = this.props.comments[this.props.comment_id];   
        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(comment.text), decorator),
        };
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.onChange = editorState => this.setState({editorState});
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

    render() {
        return (
            <EditorContainer>
                <EditorInnerContainer onClick={this.focusEditor}>
                    <Editor
                        editorKey="editor"
                        editorState={this.state.editorState} 
                        onChange={this.onChange}
                        blockStyleFn={this.customBlockStyles}
                        blockRenderMap={extendedBlockRenderMap}
                        customStyleMap={styleMap}
                        readOnly={true}
                    />
                </EditorInnerContainer>
            </EditorContainer>
        );
    }
}

CommentDisplay.propTypes = {
    comment_id: PropTypes.string.isRequired
};


const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(
    mapStateToProps
)(CommentDisplay);