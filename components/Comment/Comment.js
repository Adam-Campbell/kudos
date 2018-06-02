import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { Button } from '../Button';
import CommentMetaBlock from './CommentMetaBlock';
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

const Comment = props => (
    <CommentDepth depth={props.commentParentsLength - 1}>
        <CommentContainer>
            <CommentMetaBlock 
                authorAvatar={props.authorAvatar}
                author_id={props.author_id}
                authorUsername={props.authorUsername}
                commentCreatedAt={props.commentCreatedAt}
            />
            <InnerContainer>
                <CommentDisplay optionalComment_id={props.comment_id} />
            </InnerContainer>
            <InnerContainer>
                {props.isLoggedIn && <Button onClick={props.toggleReplyForm}>Reply</Button>}
            </InnerContainer> 
            {
                props.isLoggedIn && 
                props.replyFormIsVisible &&
                <CommentEditor 
                    submitCallback={props.boundReplyToComment}
                    cancelCallback={props.toggleReplyForm}
                    isCancellable={true}
                />
            }
        </CommentContainer>
    </CommentDepth>
);

export default Comment;