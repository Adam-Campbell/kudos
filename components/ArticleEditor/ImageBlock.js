import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { 
    Entity, 
    DraftEntityInstance, 
    EditorBlock, 
    ContentState, 
    EditorState, 
    SelectionState 
} from 'draft-js';

console.log(EditorBlock);

const FileInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;    
`;

const FileInputLabel = styled.label`
    background-color: ${styleConstants.colorPrimary};
    border: solid 2px ${styleConstants.colorPrimary};
    border-radius: 3px;
    padding: 8px 16px;
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: 400;
    color: ${styleConstants.colorSecondary};
    cursor: pointer;
    display: inline-block;
    text-align: center;
    ${FileInput}:focus + & {
        outline: 1px dotted #000;
	    outline: -webkit-focus-ring-color auto 5px;
    } 
`;
//width: ${props => props.fullWidth ? '100%' : '50%'};
const Figure = styled.figure`
    max-width: ${props => props.fullWidth ? '100%' : '800px'};
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 16px;
    background-color: ${styleConstants.colorInputBackground};
    border-radius: 3px;
    position: relative;
    text-align: center;
`;

const FigCaption = styled.figcaption`
    text-align: center;
    font-family: ${styleConstants.fontSecondary};
    font-size: 14px;
    font-weight: 400;
    color: ${styleConstants.colorSecondary};
    margin-top: 8px;
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
`;

const HalfWidthButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    background-color: ${styleConstants.colorSecondary};
    color: ${styleConstants.colorBodyText};
    border: none;
`;

const FullWidthButton = styled.button`
    position: absolute;
    top: 0;
    left: 32px;
    width: 32px;
    height: 32px;
    background-color: ${styleConstants.colorSecondary};
    color: ${styleConstants.colorBodyText};
    border: none;
`;


class ImageBlock extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props.foo)
        //console.log(this.props.block.getKey());
        //console.log(this.props.contentState);
        this.blockKey = this.props.block.getKey();
        this.imageFileInput = React.createRef();
        this.updateImages = this.updateImages.bind(this);
        this.checkForFile = this.checkForFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.makeFullWidth = this.makeFullWidth.bind(this);
        this.makeHalfWidth = this.makeHalfWidth.bind(this);
        this.focusBlock = this.focusBlock.bind(this);
    }

    updateImages(imagesObject) {
        this.props.contentState.mergeEntityData(
            this.props.block.getEntityAt(0),
            {images: imagesObject}
        );
        setTimeout(() => {
            this.forceUpdate();
        }, 0);
    }

    makeFullWidth() {
        this.props.contentState.mergeEntityData(
            this.props.block.getEntityAt(0), 
            {fullWidth: true}
        );
        setTimeout(() => {
            this.forceUpdate();
        }, 0);
    }

    makeHalfWidth() {
        this.props.contentState.mergeEntityData(
            this.props.block.getEntityAt(0), 
            {fullWidth: false}
        );
        setTimeout(() => {
            this.forceUpdate();
        }, 0);
    }

    checkForFile() {
        const imageFile = this.imageFileInput.current.files[0];
        if (imageFile) {
            //this.image = imageFile;
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
        const imageUploadRequest = await fetch(`http://localhost:5000/api/upload`, settings);
        const imageUploadResponse = await imageUploadRequest.json();
        const imagesObject = imageUploadResponse.images;
        this.updateImages(imagesObject)
    }

    focusBlock() {
        /*
            Essentially I need to identify what is currently selected. If it this block
            that is currently selected, then I don't need to do anything. If it isn't this
            block, I need to alter the current selection to this block.
        */
        const { block, blockProps } = this.props;
        const { getEditorState, setEditorState } = blockProps;
        const key = block.getKey();
        const editorState = getEditorState();
        const selectionState = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const currentBlock = contentState.getBlockForKey(selectionState.getStartKey());
        if (currentBlock.getKey() === key) {
           return;
        }
        const newSelection = new SelectionState({
            anchorKey: key,
            focusKey: key,
            anchorOffset: 0,
            focusOffset: 0,
        });
        setEditorState(EditorState.forceSelection(editorState, newSelection));
    }

    render() {
        const currentEntity = this.props.contentState.getEntity(
            this.props.block.getEntityAt(0)
        );
        const { images, fullWidth } = currentEntity.getData();
        let src = '';
        if (images.hasOwnProperty('original')) {
            src = images.original.imageUrl;
        }
        return (
            <Figure fullWidth={fullWidth} onClick={this.focusBlock}>
                <Image src={src} />
                <div>
                    <FileInputLabel>
                        <FileInput 
                            type="file"
                            name="imageFileInput"
                            onChange={this.checkForFile}
                            innerRef={this.imageFileInput}
                        />
                        Upload a new image...
                    </FileInputLabel>
                </div>
                <HalfWidthButton onMouseDown={this.makeHalfWidth}>H</HalfWidthButton>
                <FullWidthButton onMouseDown={this.makeFullWidth}>F</FullWidthButton>
            </Figure>
        );
    }
}


const mapStateToProps = state => ({
    token: state.currentUser.token
});
//export default ImageBlock;
export default connect(mapStateToProps)(ImageBlock);