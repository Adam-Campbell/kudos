import React, { Component } from 'react';
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
import { debounce } from 'lodash';

const ControlsContainer = styled.div`
    border-top: solid 2px ${styleConstants.colorBodyText};
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1000;
    position: ${props => props.isDetached ? 'fixed' : 'relative'};
    background-color: ${props => props.isDetached ? styleConstants.colorBodyText : styleConstants.colorSecondary};
`;

/*
top: ${props => props.topOffset ? `${props.topOffset}px` : 0};
    left: ${props => props.leftOffset ? `${props.leftOffset}px` : 0};
*/

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
                onMouseDown={props.changeBlockType('header-one')}
                isActive={blockType === 'header-one'}
            >
                <TitleIcon />
            </ControlButton>
            <ControlButton
                onMouseDown={props.changeBlockType('header-two')}
                isActive={blockType === 'header-two'}
            >
                <TitleIcon />
            </ControlButton>
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

// const LinkMenu = props => (
//     <LinkMenuContainer isOpen={props.isOpen}>
//         <LinkInput 
//             value={props.linkUrl}
//             onChange={props.updateLinkUrl}
//             placeholder="Enter a URL..."
//         />
//         <LinkControlsContainer>
//             <CancelLinkButton onMouseDown={props.toggleLinkMenu}>Cancel</CancelLinkButton>
//             <AddLinkButton onMouseDown={props.createLink}>Add Link</AddLinkButton>
//         </LinkControlsContainer>

//     </LinkMenuContainer>
// );

class LinkMenu extends Component {
    constructor(props) {
        super(props);
        this.inputNode = React.createRef();
        this.focusInput = this.focusInput.bind(this);
    }

    componentDidMount() {
        console.log('LinkMenu component has mounted');
        window.inputNode = this.inputNode;
        this.focusInput();
    }

    focusInput(e) {
        if (e) {
            e.preventDefault();
        }
        this.inputNode.current.focus();
    }

    render() {
        return (
            <LinkMenuContainer isOpen={this.props.isOpen}
            onMouseDown={this.focusInput}
            >
                <input
                    type="text" 
                    value={this.props.linkUrl}
                    onChange={this.props.updateLinkUrl}
                    placeholder="Enter a URL..."
                    ref={this.inputNode}
                />
                <LinkControlsContainer>
                    <CancelLinkButton onMouseDown={this.props.toggleLinkMenu}>Cancel</CancelLinkButton>
                    <AddLinkButton onMouseDown={this.props.createLink}>Add Link</AddLinkButton>
                </LinkControlsContainer>

            </LinkMenuContainer>
        );
    }
}

// const EditorControls = props => (
//     <ControlsContainer>
//         <InlineStyleControls 
//             editorState={props.editorState}
//             toggleInlineStyle={props.toggleInlineStyle}
//         />
//         <BlockStyleControls 
//             editorState={props.editorState}
//             changeBlockType={props.changeBlockType}
//             toggleCode={props.toggleCode}
//         />
//         <LinkMenu 
//             isOpen={props.linkMenuIsOpen}
//             linkUrl={props.linkUrl}
//             updateLinkUrl={props.updateLinkUrl}
//             toggleLinkMenu={props.toggleLinkMenu}
//             createLink={props.createLink}
//         />
//         <ControlButton 
//             onMouseDown={props.toggleLinkMenu} 
//             isActive={props.linkMenuIsOpen}
//         >
//             <LinkIcon />
//         </ControlButton>
//         <ControlButton
//             onMouseDown={props.addImageBlock}
//             isActive={false}
//         >
//             Add Image    
//         </ControlButton>
//         <ControlButton
//             onMouseDown={props.logRaw}
//             isActive={false}
//         >
//             Log Raw
//         </ControlButton>
//         <div>
//         <SubmitButton onMouseDown={props.handleSubmit}>Submit</SubmitButton>
//         </div>
//     </ControlsContainer>
// );

const DetachButton = styled.button`
    padding: 8px 16px;
    border-radius: 3px;
    border: solid 2px ${styleConstants.colorPrimary};
    background-color: ${styleConstants.colorPrimary};
    color: ${styleConstants.colorSecondary};
`;

const MoveButton = styled.button`
    padding: 8px 8px;
    border-radius: 3px;
    border: solid 2px ${styleConstants.colorWarning};
    background-color: ${styleConstants.colorWarning};
    color: ${styleConstants.colorSecondary};
    position: absolute;
    top: 0;
    left: 0;
`;

class EditorControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            isDetached: false,
            topOffset: 0,
            leftOffset: 0
        };
        this.container = React.createRef();
        this.moveControl = React.createRef();
        this.toggleDragging = this.toggleDragging.bind(this);
        this.logClientRect = this.logClientRect.bind(this);
        this.toggleDetached = this.toggleDetached.bind(this);
        this.startDragging = this.startDragging.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
        this.repositionControls = this.repositionControls.bind(this);
        this.touchRepositionControls = this.touchRepositionControls.bind(this);
        this.debouncedRepositionControls = debounce(this.repositionControls, 10, { leading: true, trailing: true });
        this.debouncedTouchRepositionControls = debounce(this.touchRepositionControls, 10, { leading: true, trailing: true });
    }

    componentDidMount() {
        if (typeof window !== null) {
            // document.addEventListener('mouseup', this.stopDragging);
            // document.addEventListener('mousemove', this.debouncedRepositionControls);
            // this.moveControl.current.addEventListener('touchstart', this.startDragging);
            // this.moveControl.current.addEventListener('touchmove', this.debouncedTouchRepositionControls)
            // this.moveControl.current.addEventListener('touchend', this.stopDragging);
        }
    }

    
    componentWillUnmount() {
        document.removeEventListener('mouseup', this.stopDragging);
        document.removeEventListener('mousemove', this.debouncedRepositionControls);
    }
    
    toggleDragging() {
        this.setState({ isDragging: !this.state.isDragging });
    }

    logClientRect() {
        const clientRect = this.container.current.getBoundingClientRect();
        console.log(clientRect);
    }

    toggleDetached(e) {
        //e.preventDefault();
        const { isDetached } = this.state;
        if (!isDetached) {
            const { top, left } = this.container.current.getBoundingClientRect();
            this.setState({
                isDetached: true,
                topOffset: top,
                leftOffset: left
            });
        } else {
            this.setState({
                isDetached: false, 
                topOffset: 0,
                leftOffset: 0
            });
        }
    }

    startDragging(e) {
        e.preventDefault();
        this.setState({ isDragging: true });
    }

    stopDragging(e) {
        e.preventDefault();
        this.setState({ isDragging: false });
    }

    repositionControls(e) {
        e.preventDefault();
        const { isDragging } = this.state;
        if (isDragging) {
            this.setState({
                topOffset: e.clientY,
                leftOffset: e.clientX
            });
        }
    }

    touchRepositionControls(e) {
        e.preventDefault();
        const { isDragging } = this.state;
        if (isDragging) {
            this.setState({
                topOffset: e.touches[0].clientY,
                leftOffset: e.touches[0].clientX
            });
        }
    }

    render() {
        const { isDetached, topOffset, leftOffset } = this.state;
        //onTouchStart={this.startDragging}
        //onTouchMove={this.debouncedTouchRepositionControls}
        //onTouchEnd={this.stopDragging}
        return (
            <ControlsContainer 
                innerRef={this.container}
                isDetached={isDetached}
                topOffset={topOffset}
                leftOffset={leftOffset}
                style={{
                    top: topOffset,
                    left: leftOffset
                }}
            >
                <BlockStyleControls 
                    editorState={this.props.editorState}
                    changeBlockType={this.props.changeBlockType}
                    toggleCode={this.props.toggleCode}
                />
                {this.props.linkMenuIsOpen && <LinkMenu 
                    isOpen={this.props.linkMenuIsOpen}
                    linkUrl={this.props.linkUrl}
                    updateLinkUrl={this.props.updateLinkUrl}
                    toggleLinkMenu={this.props.toggleLinkMenu}
                    createLink={this.props.createLink}
                />}
                <ControlButton 
                    onMouseDown={this.props.toggleLinkMenu} 
                    isActive={this.props.linkMenuIsOpen}
                >
                    <LinkIcon />
                </ControlButton>
                <ControlButton
                    onMouseDown={this.props.addImageBlock}
                    isActive={false}
                >
                    Add Image    
                </ControlButton>
                <ControlButton
                    onMouseDown={this.props.logRaw}
                    isActive={false}
                >
                    Log Raw
                </ControlButton>
                <div>
                <SubmitButton onMouseDown={this.props.handleSubmit}>Submit</SubmitButton>
                </div>
            </ControlsContainer> 
        );
    }
}


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