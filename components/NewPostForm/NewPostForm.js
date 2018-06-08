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

const NewPostForm = props => (
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
                        value={props.postTitle}
                        onChange={props.handlePostTitleUpdate}
                    />
                    <Label htmlFor="description">Description:</Label>
                    <Input 
                        type="text"
                        id="description"
                        name="description"
                        value={props.postDescription}
                        onChange={props.handlePostDescriptionUpdate}
                    />
                    <Label htmlFor="category">Category:</Label>
                    <Select
                        id="category"
                        name="category"
                        value={props.postCategory}
                        onChange={props.handlePostCategoryUpdate}
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
                        value={props.postBody}
                        onChange={props.handlePostBodyUpdate}
                    />
                </Fieldset>
                <Button type="submit">Save your article</Button>
            </form>
        </FormContainer>
    </Wrapper>
);

NewPostForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handlePostTitleUpdate: PropTypes.func.isRequired,
    handlePostDescriptionUpdate: PropTypes.func.isRequired,
    handlePostCategoryUpdate: PropTypes.func.isRequired,
    handlePostBodyUpdate: PropTypes.func.isRequired,
    checkForFile: PropTypes.func.isRequired,
    postTitle: PropTypes.string.isRequired,
    postDescription: PropTypes.string.isRequired,
    postCategory: PropTypes.string.isRequired,
    postBody: PropTypes.string.isRequired,
    fileInputRef: PropTypes.any.isRequired
};

export default NewPostForm;
