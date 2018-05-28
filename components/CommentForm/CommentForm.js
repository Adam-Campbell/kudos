import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { Button } from '../Button';

const Form = styled.form`
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    padding: 16px;
    width: 100%;
`;

const Label = styled.label`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 16px;
    color: ${styleConstants.colorBodyText};
    display: block;
`;

const Input = styled.textarea`
    background-color: ${styleConstants.colorInputBackground};
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
    padding: 16px;
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    display: block;
    width: 100%;
    height: 180px;
    margin-top: 16px;
    margin-bottom: 16px;
`;

const CommentForm = props => (
    <Form onSubmit={props.handleSubmit}>
        <Label htmlFor="comment-text">Write a response</Label>
        <Input 
            id="comment-text"
            name="comment_text"
            value={props.commentText}
            onChange={props.handleFieldUpdate}
        />
        <Button type="submit">Publish</Button>
    </Form>
);

export default CommentForm;