import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import CommentMetaBlock from './CommentMetaBlock';
import { Button } from '../Button';
import CommentDisplay from '../CommentDisplay';
import CommentEditor from '../CommentEditor';

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

const ControlButton = styled(Button)`
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
                    <CommentEditor 
                        submitCallback={props.boundSubmitEditComment}
                        cancelCallback={props.toggleEditing}
                        isCancellable={true}
                        comment_id={props.comment_id}
                    />
                ) : (
                    <React.Fragment>
                        <InnerContainer>
                            <CommentDisplay comment_id={props.comment_id} />
                        </InnerContainer>
                        <InnerContainer>
                            <ControlButton onClick={props.toggleReplyForm}>Reply</ControlButton>
                            <ControlButton onClick={props.toggleEditing}>Edit</ControlButton>
                            <ControlButton onClick={props.handleDelete}>Delete</ControlButton>
                        </InnerContainer> 
                        {
                            props.replyFormIsVisible &&
                            <CommentEditor
                                submitCallback={props.boundReplyToComment}
                                cancelCallback={props.toggleReplyForm}
                                isCancellable={true} 
                            />
                        }
                    </React.Fragment>
                )
            }
        </CommentContainer>
    </CommentDepth>
);

OwnComment.propTypes = {
    authorAvatar: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    authorUsername: PropTypes.string.isRequired,
    comment_id: PropTypes.string.isRequired,
    commentParentsLength: PropTypes.number.isRequired,
    commentCreatedAt: PropTypes.string.isRequired,
    replyFormIsVisible: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleReplyForm: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleCommentEditorUpdate: PropTypes.func.isRequired,
    boundReplyToComment: PropTypes.func.isRequired,
    boundSubmitEditComment: PropTypes.func.isRequired,
};

export default OwnComment;
