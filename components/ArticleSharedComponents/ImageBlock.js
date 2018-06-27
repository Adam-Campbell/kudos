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
import { rootApiUrl } from '../../globalConstants';

//console.log(EditorBlock);

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
    padding: 0;
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


class EditorImageBlock extends Component {
    constructor(props) {
        super(props);
        this.blockKey = this.props.block.getKey();
        this.updateImages = this.updateImages.bind(this);
        this.makeFullWidth = this.makeFullWidth.bind(this);
        this.makeHalfWidth = this.makeHalfWidth.bind(this);
        this.focusBlock = this.focusBlock.bind(this);
    }

    updateImages(imagesObject) {
        this.focusBlock();
        //console.log(window.getSelection());
        this.props.contentState.mergeEntityData(
            this.props.block.getEntityAt(0),
            {images: imagesObject}
        );
        //console.log(window.getSelection());
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
        console.log(selectionState);
        if (currentBlock.getKey() === key) {
           return;
        }
        const newSelection = new SelectionState({
            anchorKey: key,
            focusKey: key,
            anchorOffset: 0,
            focusOffset: 0,
            hasFocus: true
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
export const ImageBlock = connect(mapStateToProps)(EditorImageBlock);
