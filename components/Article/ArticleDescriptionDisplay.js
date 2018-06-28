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
`;

class ArticleDescriptionDisplay extends Component {

    static propTypes = {
        article_id: PropTypes.string.isRequired,
        articles: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.customBlockStyles = this.customBlockStyles.bind(this);
        const article = this.props.articles[this.props.article_id];
        const descriptionData = convertFromRaw(article.descriptionRaw);
        this.state = {
            editorState: EditorState.createWithContent(descriptionData),
        };
    }

    customBlockStyles(contentBlock) {
        const type = contentBlock.getType();
        switch (type) {
            case 'header-two':
                return 'article-editor__h2';
        }
    }

    render() {
        return (
            <Container>
                <Editor 
                    editorKey="articleDescriptionDisplay"
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

export default connect(mapStateToProps)(ArticleDescriptionDisplay);