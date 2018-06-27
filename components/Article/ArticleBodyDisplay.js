import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
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
import { 
    LinkDecorator, 
    CustomCodeBlockWrapper, 
    CenteredBlockWrapper ,
    CustomBlockQuoteWrapper,
    CustomOrderedListBlockWrapper,
    CustomUnorderedListBlockWrapper
} from '../ArticleSharedComponents';
import ImageDisplayBlock from './ImageDisplayBlock';
const Immutable = require('immutable');

const blockRenderMap = Immutable.Map({
    'code-block': { element: 'pre', wrapper: <CustomCodeBlockWrapper />},
    'unstyled': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'header-one': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'header-two': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'block-quote': { element: 'div', wrapper: <CustomBlockQuoteWrapper/> },
    'unordered-list-item': { element: 'li', wrapper: <CustomUnorderedListBlockWrapper/> },
    'ordered-list-item': { element: 'li', wrapper: <CustomOrderedListBlockWrapper/> }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const styleMap = {
    'SUPERSCRIPT': {
        verticalAlign: 'super',
        fontSize: 'smaller',
        lineHeight: 'normal'
    }
};

const Container = styled.div`
    padding: 16px;
    border: solid 2px #eee;
    position: relative;
    margin-top: 16px;
    margin-bottom: 16px;
`;

class ArticleBodyDisplay extends Component {

    static propTypes = {
        article_id: PropTypes.string.isRequired,
        articles: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.blockRendererFn = this.blockRendererFn.bind(this);
        this.findLinkEntities = this.findLinkEntities.bind(this);
        this.customBlockStyles = this.customBlockStyles.bind(this);
        this.decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: LinkDecorator
            }
        ]);
        const article = this.props.articles[this.props.article_id];
        const bodyData = convertFromRaw(article.bodyRaw);
        this.state = {
            editorState: EditorState.createWithContent(bodyData, this.decorator),
        };
    }

    blockRendererFn(block) {
        if (block.getType() === 'atomic') {
            return {
                component: ImageDisplayBlock,
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
                return 'article-editor__block-quote';
            case 'header-one':
                return 'comment-editor__h1';
            case 'header-two':
                return 'comment-editor__h2';
        }
    }

    render() {
        return (
            <Container>
                <Editor 
                    editorKey="articleBodyDisplay"
                    editorState={this.state.editorState}
                    blockStyleFn={this.customBlockStyles}
                    blockRenderMap={extendedBlockRenderMap}
                    customStyleMap={styleMap}
                    blockRendererFn={this.blockRendererFn}
                    readOnly={true}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(mapStateToProps)(ArticleBodyDisplay);