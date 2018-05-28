import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import NewPostForm from './NewPostForm';

class NewPostFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.checkForFile = this.checkForFile.bind(this);
        this.fileInput = React.createRef();
        this.form;
        this.image;
        this.state = {
            postTitle: '',
            postDescription: '',
            postCategory: '',
            postBody: '',
            hasAddedImage: false
        };
    }

    checkForFile() {
        const imageFile = this.fileInput.current.files[0];
        if (imageFile) {
            this.image = imageFile;
            this.setState({ hasAddedImage: true });
        }
    }

    handleFieldUpdate(fieldName) {
        return (e) => {
            this.setState({ [fieldName]: e.target.value });
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        const { postTitle, postBody, postCategory, postDescription, hasAddedImage } = this.state;
        if (postTitle && postBody && postCategory && postDescription && hasAddedImage) {
            this.form = new FormData();
            this.form.append('title', this.state.postTitle);
            this.form.append('text', this.state.postBody);
            this.form.append('category', this.state.postCategory);
            this.form.append('description', this.state.postDescription);
            this.form.append('image', this.image);
            this.props.createPost(this.form, this.props.currentUser_id, this.props.token);
        } else {
            alert("You haven't filled out all the necessary fields.");
        }
    }

    render() {
        return <NewPostForm 
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
    currentUser_id: state.currentUser._id
});

export default connect(
    mapStateToProps,
    {
        createPost: ActionCreators.createPost
    }
)(NewPostFormContainer);
