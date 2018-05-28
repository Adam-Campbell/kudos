import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import CommentMetaBlock from './CommentMetaBlock';
import CommentReplyForm from './CommentReplyForm';
import { Button } from '../Button';

const CommentDepth = styled.div`
    width: 100%;
    margin-top: 16px;
    padding-left: ${props => `${props.depth * 25}px`};
`;

const CommentContainer = styled.div`
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
`;

const CommentText = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    line-height: 1.4;
`;

const InnerContainer = styled.div`
    padding: 8px 16px;
`;

const CommentEditorInput = styled.textarea`
    width: 100%;
    height: 120px;
    font-family: ${styleConstants.fontSecondary};
    color: ${styleConstants.colorBodyText};        
    padding: 8px;
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
`;

const ControlButton = Button.extend`
    & + & {
        margin-left: 8px;
    }
`;

const OwnComment = props => (
    <CommentDepth depth={props.commentParentsLength - 1}>
        <CommentContainer>
            <CommentMetaBlock 
                authorAvatar={props.authorAvatar}
                author_id={props.author_id}
                authorUsername={props.authorUsername}
                commentCreatedAt={props.commentCreatedAt}
            />
            {
                props.isEditing ? (
                    <React.Fragment>
                        <InnerContainer>
                            <CommentEditorInput 
                                value={props.commentEditorText}
                                onChange={props.handleCommentEditorUpdate}
                            />
                        </InnerContainer>
                        <InnerContainer>
                            <ControlButton onClick={props.cancelEdit}>Cancel</ControlButton>
                            <ControlButton onClick={props.handleEditSubmit}>Save</ControlButton>
                        </InnerContainer>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <InnerContainer>
                                <CommentText>{props.commentText}</CommentText>
                        </InnerContainer>
                        <InnerContainer>
                            <ControlButton onClick={props.toggleReplyForm}>Reply</ControlButton>
                            <ControlButton onClick={props.toggleEditing}>Edit</ControlButton>
                            <ControlButton onClick={props.handleDelete}>Delete</ControlButton>
                        </InnerContainer> 
                        {
                            props.replyFormIsVisible &&
                            <CommentReplyForm 
                                _id={props.comment_id}
                                toggleReplyForm={props.toggleReplyForm}
                            />
                        }
                    </React.Fragment>
                )
            }
        </CommentContainer>
    </CommentDepth>
);

export default OwnComment;
