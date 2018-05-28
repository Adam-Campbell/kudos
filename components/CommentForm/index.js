import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import CommentForm from './CommentForm';

class CommentFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            commentText: ''
        };
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { commentText } = this.state;
        this.props.replyToPost(commentText, this.props.post_id, this.props.token);
        this.setState({ commentText: '' });
    }

    render() {
        return <CommentForm 
            handleSubmit={this.handleSubmit}
            commentText={this.state.commentText}
            handleFieldUpdate={this.handleFieldUpdate('commentText')}
        />
    }
}

const mapStateToProps = state => ({
    token: state.currentUser.token
});

export default connect(
    mapStateToProps, 
    {
        replyToPost: ActionCreators.replyToPost
    }
)(CommentFormContainer);





{/* <div>
                <form onSubmit={this.handleSubmit}>
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
            </div> */}