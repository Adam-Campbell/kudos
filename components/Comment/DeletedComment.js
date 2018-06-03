import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const CommentDepth = styled.div`
    width: 100%;
    margin-top: 16px;
    padding-left: ${props => `${props.depth * 25}px`};
`;

const CommentContainer = styled.div`
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    padding: 16px;
`;

const CommentText = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    line-height: 1.4;
    text-align: center;
`;


const DeletedComment = props => (
    <CommentDepth depth={props.commentParentsLength - 1}>
        <CommentContainer>
            <CommentText>Comment deleted by user.</CommentText>
        </CommentContainer>
    </CommentDepth>
);

DeletedComment.propTypes = {
    commentParentsLength: PropTypes.number.isRequired
};

export default DeletedComment;