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

const Immutable = require('immutable');

/*
The problem I'm encountering:

I need to have it so when a user edits one of their comments and then clicks submit, it toggles
straight back into the non editing state, and then renders the CommentDisplay component with the new
text. 

Currently, it does not do this. This is because it renders the CommentDisplay component straight away, 
technically before the new props (the updated comment text) have reached it. And then because it doesn't
work off of props, only internal state (it only gets its initial mounting state from props), it doesn't have
the correct text anymore, and it won't until the component is forcibly rerendered. 

Maybe there is a solution to this using getDerivedStateFromProps.

However, I think ultimately the best way to go is just not to have seperate components for editable / readOnly
text editors (I'm referring to CommentEditor and CommentDisplay here).

If I store isEditing in the state I can then toggle it to switch between editing and readOnly modes. I can
also conditionally render the editing controls depending on this part of state. This should resolve the issue
outlined above.

One small issue might be the reply to post comment editor, as this should always be in editing mode, so I will 
need to find a way to force it to stay in editing mode in this one instance. This shouldn't present too much
of a problem however. 

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
        const comment = this.props.comments[this.props.optionalComment_id];       
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


const mapStateToProps = state => ({
    comments: state.comments
});

export default connect(
    mapStateToProps
)(CommentDisplay);