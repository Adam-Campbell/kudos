import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import EditArticleForm from './EditArticleForm';

class EditArticleFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.checkForFile = this.checkForFile.bind(this);
        this.fileInput = React.createRef();
        this.article = this.props.posts[this.props.article_id];
        this.form;
        this.image;
        this.state = {
            articleTitle: this.article.title,
            articleDescription: this.article.description,
            articleCategory: this.article.category,
            articleBody: this.article.text,
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
        this.form.append('title', this.state.articleTitle);
        this.form.append('text', this.state.articleBody);
        this.form.append('category', this.state.articleCategory);
        this.form.append('description', this.state.articleDescription);
        this.form.append('image', this.image);
        this.props.editPost(
            this.form, 
            this.props.article_id, 
            this.state.originalCategory,
            this.state.articleCategory,
            this.props.token
        );
    }

    render() {
        return <EditArticleForm 
            handleSubmit={this.handleSubmit}
            handleArticleTitleUpdate={this.handleFieldUpdate('articleTitle')}
            handleArticleDescriptionUpdate={this.handleFieldUpdate('articleDescription')}
            handleArticleCategoryUpdate={this.handleFieldUpdate('articleCategory')}
            handleArticleBodyUpdate={this.handleFieldUpdate('articleBody')}
            checkForFile={this.checkForFile}
            articleTitle={this.state.articleTitle}
            articleDescription={this.state.articleDescription}
            articleCategory={this.state.articleCategory}
            articleBody={this.state.articleBody}
            fileInputRef={this.fileInput}
        />
    }
}

EditArticleFormContainer.propTypes = {
    article_id: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    token: state.currentUser.token,
    currentUser_id: state.currentUser._id,
    articles: state.posts.models
});

export default connect(
    mapStateToProps,
    {
        editPost: ActionCreators.editPost
    }
)(EditArticleFormContainer);
