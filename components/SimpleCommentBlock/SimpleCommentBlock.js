import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { AnchorButton } from '../Button';
import CommentDisplay from '../CommentDisplay';

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

const DiscussionAnchor = AnchorButton.extend`
    display: inline-block;
    margin-top: 16px;
`;

const SimpleCommentBlock = props => (
    <BlockContainer>
        <CommentDisplay optionalComment_id={props.comment_id} />
        <Link passHref as={`/post/${props.discussion_id}`} href={`/post?post=${props.discussion_id}`}>
            <DiscussionAnchor>View Discussion</DiscussionAnchor>
        </Link>
    </BlockContainer>
);

export default SimpleCommentBlock;