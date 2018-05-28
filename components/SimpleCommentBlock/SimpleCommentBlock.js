import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { AnchorButton } from '../Button';

const BlockContainer = styled.div`
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    padding: 16px;
    margin-bottom: 16px;
`;

const CommentText = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    line-height: 1.4;
`;

const SimpleCommentBlock = props => (
    <BlockContainer>
        <CommentText>{props.commentText}</CommentText>
        <Link passHref as={`/post/${props.discussion_id}`} href={`/post?post=${props.discussion_id}`}>
            <AnchorButton>View Discussion</AnchorButton>
        </Link>
    </BlockContainer>
);

export default SimpleCommentBlock;