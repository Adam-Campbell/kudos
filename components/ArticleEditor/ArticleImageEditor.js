import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { rootApiUrl } from '../../globalConstants';

const ImageInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;   
`;

const ImageInputLabel = styled.label`
    background-color: rgba(46, 139, 87, 0.6);
    border: dashed 2px lime;
    border-radius: 3px;
    padding: 16px 32px;
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: 400;
    color: ${styleConstants.colorSecondary};
    cursor: pointer;
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${ImageInput}:focus + & {
        outline: 1px dotted #000;
	    outline: -webkit-focus-ring-color auto 5px;
    } 
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
    margin-bottom: -4px;
`;

const OuterContainer = styled.div`
    width: 100%;
    min-height: ${props => props.withImage ? '0px' : '320px'};
    position: relative;
    border: solid #eee 2px;
`;


const ArticleImageEditor = props => {
    let withImage = false;
    let imageUrl = '';
    let instructions = 'Add an image...'
    if (props.editorState.hasOwnProperty('original')) {
        withImage = true;
        imageUrl = props.editorState.original.imageUrl;
        instructions = 'Update image...'
    }
    
    return (
        <OuterContainer withImage={withImage}>
            <Image src={imageUrl} />
            <ImageInputLabel>
                <ImageInput 
                    type="file"
                    innerRef={props.imageFileInputRef}
                    onChange={props.checkForFile}
                />
                {instructions}
            </ImageInputLabel>
        </OuterContainer>
    );
};

class ArticleImageEditorContainer extends Component {
    constructor(props) {
        super(props);
        this.imageFileInput = React.createRef();
        this.checkForFile = this.checkForFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    checkForFile(e) {
        e.preventDefault();
        const imageFile = this.imageFileInput.current.files[0];
        if (imageFile) {
            this.uploadImage(imageFile);
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
        this.props.updateEditorState(imagesObject);
    }

    render() {
        return (
            <ArticleImageEditor 
                editorState={this.props.editorState}
                checkForFile={this.checkForFile}
                imageFileInputRef={this.imageFileInput}
            />
        );
    }
}

const mapStateToProps = state => ({
    token: state.currentUser.token
});

export default connect(mapStateToProps)(ArticleImageEditorContainer);