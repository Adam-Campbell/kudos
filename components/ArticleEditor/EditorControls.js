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
    LinkIcon 
} from '../EditorIcons';
import ControlButton from './ControlButton';

const ControlsContainer = styled.div`
    border-top: solid 2px ${styleConstants.colorBodyText};
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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
    cursor: pointer;
`;

const LinkMenuContainer = styled.div`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    left: 8px;
    bottom: 8px;
    background-color: ${styleConstants.colorBodyText};
    border-radius: 3px;
    padding: 16px;
    margin-right: 8px;
`;

const LinkInput = styled.input`
    background-color: ${styleConstants.colorInputBackground};
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
    color: ${styleConstants.colorBodyText};
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    padding: 6px 8px 6px 0;
    vertical-align: top;
    text-indent: 8px;
    margin-bottom: 8px;
`;

const AddLinkButton = styled.button`
    background-color: ${styleConstants.colorPrimary};
    color: ${styleConstants.colorSecondary};
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    padding: 8px;
    border-radius: 3px;
    border: none;
    margin-left: 8px;
`;

const CancelLinkButton = styled.button`
    background-color: ${styleConstants.colorWarning};
    color: ${styleConstants.colorSecondary};
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    padding: 8px;
    border-radius: 3px;
    border: none;
`;

const LinkControlsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const InlineStyleControls = props => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <React.Fragment>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('BOLD')} 
                isActive={currentStyle.has('BOLD')}
            >
                <BoldIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('ITALIC')} 
                isActive={currentStyle.has('ITALIC')}
            >
                <ItalicIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('UNDERLINE')} 
                isActive={currentStyle.has('UNDERLINE')}
            >
                <UnderlineIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('STRIKETHROUGH')} 
                isActive={currentStyle.has('STRIKETHROUGH')}
            >
                <StrikethroughIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('SUPERSCRIPT')} 
                isActive={currentStyle.has('SUPERSCRIPT')}
            >
                <SuperscriptIcon />
            </ControlButton>
        </React.Fragment>
    );
};

const BlockStyleControls = props => {
    const selection = props.editorState.getSelection();
    const blockType = props.editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();

    return (
        <React.Fragment>
            <ControlButton
                onMouseDown={props.changeBlockType('unordered-list-item')}
                isActive={blockType === 'unordered-list-item'}
            >
                <UnorderedListIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.changeBlockType('ordered-list-item')}
                isActive={blockType === 'ordered-list-item'}
            >
                <OrderedListIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.changeBlockType('block-quote')}
                isActive={blockType === 'block-quote'}
            >
                <BlockQuoteIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleCode}
                isActive={blockType === 'code-block'}
            >
                <CodeIcon />
            </ControlButton>
        </React.Fragment>
    );
};

const LinkMenu = props => (
    <LinkMenuContainer isOpen={props.isOpen}>
        <LinkInput 
            value={props.linkUrl}
            onChange={props.updateLinkUrl}
            placeholder="Enter a URL..."
        />
        <LinkControlsContainer>
            <CancelLinkButton onMouseDown={props.toggleLinkMenu}>Cancel</CancelLinkButton>
            <AddLinkButton onMouseDown={props.createLink}>Add Link</AddLinkButton>
        </LinkControlsContainer>

    </LinkMenuContainer>
);

const EditorControls = props => (
    <ControlsContainer>
        <InlineStyleControls 
            editorState={props.editorState}
            toggleInlineStyle={props.toggleInlineStyle}
        />
        <BlockStyleControls 
            editorState={props.editorState}
            changeBlockType={props.changeBlockType}
            toggleCode={props.toggleCode}
        />
        <LinkMenu 
            isOpen={props.linkMenuIsOpen}
            linkUrl={props.linkUrl}
            updateLinkUrl={props.updateLinkUrl}
            toggleLinkMenu={props.toggleLinkMenu}
            createLink={props.createLink}
        />
        <ControlButton 
            onMouseDown={props.toggleLinkMenu} 
            isActive={props.linkMenuIsOpen}
        >
            <LinkIcon />
        </ControlButton>
        <div>
        <SubmitButton onMouseDown={props.handleSubmit}>Submit</SubmitButton>
        </div>
    </ControlsContainer>
);

EditorControls.propTypes = {
    editorState: PropTypes.object.isRequired,
    toggleInlineStyle: PropTypes.func.isRequired,
    toggleCode: PropTypes.func.isRequired,
    changeBlockType: PropTypes.func.isRequired,
    linkMenuIsOpen: PropTypes.bool.isRequired,
    linkUrl: PropTypes.string.isRequired,
    updateLinkUrl: PropTypes.func.isRequired,
    toggleLinkMenu: PropTypes.func.isRequired,
    createLink: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default EditorControls;