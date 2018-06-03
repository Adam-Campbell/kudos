import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { Wrapper } from '../Layout';
import { Button } from '../Button';
import {
    FormContainer,
    Fieldset,
    Legend,
    Label,
    Input,
    FileInput,
    Textarea,
    Select,
    Option
} from '../Forms';

const EditArticleForm = props => (
    <Wrapper tight>
        <FormContainer>
            <form onSubmit={props.handleSubmit}>
                <Fieldset>
                    <Legend>Tell us about your post</Legend>
                    <Label htmlFor="title">Title:</Label>
                    <Input 
                        type="text"
                        id="title"
                        name="title"
                        value={props.articleTitle}
                        onChange={props.handleArticleTitleUpdate}
                    />
                    <Label htmlFor="description">Description:</Label>
                    <Input 
                        type="text"
                        id="description"
                        name="description"
                        value={props.articleDescription}
                        onChange={props.handleArticleDescriptionUpdate}
                    />
                    <Label htmlFor="category">Category:</Label>
                    <Select
                        id="category"
                        name="category"
                        value={props.articleCategory}
                        onChange={props.handleArticleCategoryUpdate}
                    >
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
                    <Label htmlFor="image">Image:</Label>
                    <FileInput
                        type="file" 
                        id="image"
                        name="image"
                        onChange={props.checkForFile}
                        innerRef={props.fileInputRef}
                    />
                    <Label htmlFor="body">Body:</Label>
                    <Textarea 
                        id="body"
                        name="body"
                        value={props.articleBody}
                        onChange={props.handleArticleBodyUpdate}
                    />
                </Fieldset>
                <Button type="submit">Save your article</Button>
            </form>
        </FormContainer>
    </Wrapper>
);

EditArticleForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleArticleTitleUpdate: PropTypes.func.isRequired,
    handleArticleDescriptionUpdate: PropTypes.func.isRequired,
    handleArticleCategoryUpdate: PropTypes.func.isRequired,
    handleArticleBodyUpdate: PropTypes.func.isRequired,
    checkForFile: PropTypes.func.isRequired,
    articleTitle: PropTypes.string.isRequired,
    articleDescription: PropTypes.string.isRequired,
    articleCategory: PropTypes.string.isRequired,
    articleBody: PropTypes.string.isRequired,
    fileInputRef: PropTypes.any,
};

export default EditArticleForm;
