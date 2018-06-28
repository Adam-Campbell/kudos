import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { rootApiUrl } from '../../globalConstants';

const StyledImageInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;  
`;

const StyledImageLabel = styled.label`
    background-color: ${props => props.isActive ? 
        `${styleConstants.colorInputActive}` : 
        `${styleConstants.colorInputBackground}`
    };
    border: solid 2px;
    border-color: ${props => props.isActive ? 
        `${styleConstants.colorInputActive}` : 
        `${styleConstants.colorInputBackground}`
    };
    border-radius: 3px;
    padding: 4px;
    width: 32px;
    height: 32px;
    margin-top: 4px;
    margin-bottom: 4px;
    cursor: pointer;
    ${StyledImageInput}:focus + & {
        outline: 1px dotted #000;
	    outline: -webkit-focus-ring-color auto 5px;
    }
`;

const AddImageButton = props => (
    <StyledImageLabel>
        <StyledImageInput 
            type="file"
            innerRef={props.imageFileInputRef}
            onChange={props.handleChange}
        />
        I
    </StyledImageLabel>
);

class AddImageButtonContainer extends Component {

    static propTypes = {
        addImageBlock: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.imageFileInput = React.createRef();
        this.checkForFile = this.checkForFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.state = {
            isUploading: false
        };
    }

    async checkForFile(e) {
        e.preventDefault();
        const imageFile = this.imageFileInput.current.files[0];
        if (imageFile) {
            this.setState({ isUploading: true });
            await this.uploadImage(imageFile);
            this.setState({ isUploading: false });
        }
    }

    async uploadImage(image) {
        const form = new FormData();
        form.append('image', image);
        const settings = {
            headers: {
                'Authorization': `Bearer ${this.props.token}`
            },
            method: 'post',
            body: form
        };
        const imageUploadRequest = await fetch(`${rootApiUrl}/api/upload`, settings);
        const imageUploadResponse = await imageUploadRequest.json();
        const imagesObject = imageUploadResponse.images;
        this.props.addImageBlock(imagesObject);
    }

    render() {
        return (
            <AddImageButton 
                imageFileInputRef={this.imageFileInput}
                handleChange={this.checkForFile}
            />
        );
    }
}

const mapStateToProps = state => ({
    token: state.currentUser.token
});

export default connect(mapStateToProps)(AddImageButtonContainer);