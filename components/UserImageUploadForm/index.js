import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import UserImageUploadForm from './UserImageUploadForm';

class UserImageUploadFormContainer extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.form;
        this.checkForFile = this.checkForFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.state = {
            imageLoaded: false
        };
    }

    checkForFile() {
        const imageFile = this.fileInput.current.files[0];
        if (imageFile) {
            this.loadImage(imageFile);
        }
    }

    loadImage(imageFile) {
        this.form = new FormData();
        this.form.append('avatar', imageFile);
        this.setState({imageLoaded: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateUserAvatar(this.form, this.props.token);
    }

    render() {
        return <UserImageUploadForm 
            handleSubmit={this.handleSubmit}
            checkForFile={this.checkForFile}
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
    { updateUserAvatar: ActionCreators.updateUserAvatar }
)(UserImageUploadFormContainer);
