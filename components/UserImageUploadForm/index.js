import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import UserImageUploadForm from './UserImageUploadForm';

/*

Initial thoughts...

I use the filereader api to read the file that the user has uploaded. 

I then use FormData api/interface to take the image and send it to the backend API. 



*/

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




// return (
//     <form method="put" id="avatarForm" onSubmit={this.handleSubmit}>
//         <fieldset>
//             <legend>Upload a new avatar</legend>
//             <label htmlFor="avatar">Avatar:</label>
//             <input 
//                 type="file" 
//                 id="avatar" 
//                 name="avatar" 
//                 ref={this.fileInput}
//                 onChange={this.checkForFile} 
//             />
//             {this.state.imageLoaded && <button type="submit">Save</button>}
//         </fieldset>
//     </form>
// );