import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import * as styleConstants from '../styleConstants';
import styled from 'styled-components';
import { Button } from '../Button';

const CommentReplyContainer = styled.div`
    padding: 8px 16px;
`;

const CommentReplyInput = styled.textarea`
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

const ControlsContainer = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`;


class CommentReplyForm extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            commentReplyText: ''
        };
    }

    handleFieldUpdate(fieldname) {
        return (e) => {
            this.setState({ [fieldname]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { commentReplyText } = this.state;
        this.props.replyToComment(commentReplyText, this.props._id, this.props.token);
        this.setState({ commentReplyText: '' });
        this.props.toggleReplyForm();
    }

    render() {
        return (
            <CommentReplyContainer>
                <CommentReplyInput 
                    value={this.state.commentReplyText}
                    onChange={this.handleFieldUpdate('commentReplyText')}
                />
                <ControlsContainer>
                    <ControlButton onClick={this.props.toggleReplyForm}>Cancel</ControlButton>
                    <ControlButton onClick={this.handleSubmit}>Reply</ControlButton>
                </ControlsContainer>
            </CommentReplyContainer>
        )
    }
}

const mapStateToProps = state => ({
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    {
        replyToComment: ActionCreators.replyToComment
    }
)(CommentReplyForm);