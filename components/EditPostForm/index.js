import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import EditPostForm from './EditPostForm';

class EditPostFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.checkForFile = this.checkForFile.bind(this);
        this.fileInput = React.createRef();
        this.post = this.props.posts[this.props.post_id];
        this.form;
        this.image;
        this.state = {
            postTitle: this.post.title,
            postDescription: this.post.description,
            postCategory: this.post.category,
            postBody: this.post.text,
            originalCategory: this.post.category
        };
    }

    checkForFile() {
        const imageFile = this.fileInput.current.files[0];
        if (imageFile) {
            this.image = imageFile;
        }
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.form = new FormData();
        this.form.append('title', this.state.postTitle);
        this.form.append('text', this.state.postBody);
        this.form.append('category', this.state.postCategory);
        this.form.append('description', this.state.postDescription);
        this.form.append('image', this.image);
        window.form = this.form;
        this.props.editPost(
            this.form, 
            this.props.post_id, 
            this.state.originalCategory,
            this.state.postCategory,
            this.props.token
        );
    }

    render() {
        return <EditPostForm 
            handleSubmit={this.handleSubmit}
            handlePostTitleUpdate={this.handleFieldUpdate('postTitle')}
            handlePostDescriptionUpdate={this.handleFieldUpdate('postDescription')}
            handlePostCategoryUpdate={this.handleFieldUpdate('postCategory')}
            handlePostBodyUpdate={this.handleFieldUpdate('postBody')}
            checkForFile={this.checkForFile}
            postTitle={this.state.postTitle}
            postDescription={this.state.postDescription}
            postCategory={this.state.postCategory}
            postBody={this.state.postBody}
            fileInputRef={this.fileInput}
        />
    }
}

const mapStateToProps = state => ({
    token: state.currentUser.token,
    currentUser_id: state.currentUser._id,
    posts: state.posts.models
});

export default connect(
    mapStateToProps,
    {
        editPost: ActionCreators.editPost
    }
)(EditPostFormContainer);
