import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as styleConstants from '../styleConstants';
import {
    BoldIcon, 
    ItalicIcon, 
    UnderlineIcon,
    StrikethroughIcon,
    SuperscriptIcon,
    UnorderedListIcon,
    OrderedListIcon,
    BlockQuoteIcon,
    CodeIcon, 
    LinkIcon,
    TitleIcon
} from '../EditorIcons';
import ControlButton from './ControlButton';

const ControlsContainer = styled.div`
    padding: 8px;
    text-align: center;
`;

const SubmitButton = styled.button`
    background-color: ${styleConstants.colorPrimary};
    color: ${styleConstants.colorSecondary};
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    padding: 8px 16px;
    border-radius: 3px;
    border: none;
    margin-top: 4px;
    margin-bottom: 4px;
    margin-left: 16px;
    cursor: pointer;
`;

const BlockControlButton = ControlButton.extend`
    margin-left: 8px;
    margin-right: 8px;
`;


const BlockStyleControls = props => {
    const selection = props.editorState.getSelection();
    const blockType = props.editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();

    return (
        <ControlsContainer>
            <BlockControlButton
                onMouseDown={props.changeBlockType('header-one')}
                isActive={blockType === 'header-one'}
            >
                <TitleIcon />
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.changeBlockType('header-two')}
                isActive={blockType === 'header-two'}
            >
                <TitleIcon />
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.changeBlockType('unordered-list-item')}
                isActive={blockType === 'unordered-list-item'}
            >
                <UnorderedListIcon />
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.changeBlockType('ordered-list-item')}
                isActive={blockType === 'ordered-list-item'}
            >
                <OrderedListIcon />
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.changeBlockType('block-quote')}
                isActive={blockType === 'block-quote'}
            >
                <BlockQuoteIcon />
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.toggleCode}
                isActive={blockType === 'code-block'}
            >
                <CodeIcon />
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.addImageBlock}
                isActive={false}
            >
                Add Image
            </BlockControlButton>
            <BlockControlButton
                onMouseDown={props.logRaw}
                isActive={false}
            >
                Log Raw
            </BlockControlButton>
            <SubmitButton onMouseDown={props.handleSubmit}>Submit</SubmitButton>
        </ControlsContainer>
    );
}

export default BlockStyleControls;