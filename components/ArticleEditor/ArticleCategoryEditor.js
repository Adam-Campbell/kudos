import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { 
    Label, 
    Select, 
    Option
} from '../Forms';

const CategoryEditorContainer = styled.div`
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding: 16px;
`;


const ArticleCategoryEditor = props => (
    <CategoryEditorContainer>
        <Label htmlFor="category">Choose a Category:</Label>
            <Select
                id="category"
                name="category"
                value={props.editorState}
                onChange={(e) => props.updateEditorState(e.target.value)}
            >
                <Option value="">Choose One:</Option>
                <Option value="javascript">JavaScript</Option>
                <Option value="fantasy">Fantasy</Option>
                <Option value="games">Games</Option>
                <Option value="news">News</Option>
                <Option value="fashion">Fashion</Option>
                <Option value="travel">Travel</Option>
                <Option value="motivation">Motivation</Option>
                <Option value="relationships">Relationships</Option>
                <Option value="design">Design</Option>
                <Option value="politics">Politics</Option>
                <Option value="mentalhealth">Mental Health</Option>
                <Option value="music">Music</Option>
            </Select>
    </CategoryEditorContainer>
);

ArticleCategoryEditor.propTypes = {
    editorState: PropTypes.string.isRequired,
    updateEditorState: PropTypes.func.isRequired
};

export default ArticleCategoryEditor;