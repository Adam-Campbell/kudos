import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

class CommentReplyForm extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            commentText: ''
        };
    }

    handleFieldUpdate(fieldName, value) {
        this.setState({ [fieldName]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { commentText } = this.state;
        this.props.replyToComment(commentText, this.props.comment_id, this.props.token);
        this.setState({ commentText: '' });
        this.props.closeForm();
    }

    render() {
        return (
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="commentText">Add a comment to this discussion</label>
                        <textarea 
                            id="commentText" 
                            name="comment_text"
                            value={this.state.commentText}
                            onChange={e => this.handleFieldUpdate('commentText', e.target.value)}
                        ></textarea>
                    </fieldset>
                    <button type="submit">Submit Comment</button>
                </form>
            </div>
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