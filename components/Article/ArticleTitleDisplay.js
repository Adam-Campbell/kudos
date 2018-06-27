import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { 
    Editor, 
    EditorState, 
    convertFromRaw, 
    DefaultDraftBlockRenderMap
} from 'draft-js';


const Container = styled.div`
    padding: 8px 16px;
    position: relative;
    margin-top: 16px;
`;

class ArticleTitleDisplay extends Component {

    static propTypes = {
        article_id: PropTypes.string.isRequired,
        articles: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.customBlockStyles = this.customBlockStyles.bind(this);
        const article = this.props.articles[this.props.article_id];
        const titleData = convertFromRaw(article.titleRaw);
        this.state = {
            editorState: EditorState.createWithContent(titleData),
        };
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
            <Container>
                <Editor 
                    editorKey="articleTitleDisplay"
                    editorState={this.state.editorState}
                    blockStyleFn={this.customBlockStyles}
                    readOnly={true}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(mapStateToProps)(ArticleTitleDisplay);