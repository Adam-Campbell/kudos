import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import {
    BoldIcon, 
    ItalicIcon, 
    UnderlineIcon,
    StrikethroughIcon,
    SuperscriptIcon,
    CodeIcon,
    LinkIcon,
} from '../EditorIcons';
import { debounce } from 'lodash'; 

const ControlButton = styled.button`
    background-color: ${props => props.isActive ? '#555' : styleConstants.colorBodyText};
    border: none;
    border-radius: 3px;
    padding: 4px;
    width: 32px;
    height: 32px;
    margin: 4px;
    cursor: pointer;
    svg {
        fill: ${styleConstants.colorSecondary};
    }
`;

const ControlsContainer = styled.div`
    background-color: ${styleConstants.colorBodyText};
    border-radius: 3px;
    position: absolute;
    z-index: 90;
    color: ${styleConstants.colorSecondary};
    display: ${props => props.isShowing ? 'block' : 'none'};
    transition: all 0.25s ease;
`;

function getBlockType(editorState) {
    const selection = editorState.getSelection();
    const blockType = editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();
    return blockType
}

const InlineStyleButtons = props => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <React.Fragment>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('BOLD')} 
                isActive={currentStyle.has('BOLD')}
            >
                <BoldIcon/>
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('ITALIC')} 
                isActive={currentStyle.has('ITALIC')}
            >
                <ItalicIcon/>
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('UNDERLINE')} 
                isActive={currentStyle.has('UNDERLINE')}
            >
                <UnderlineIcon/>
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('STRIKETHROUGH')} 
                isActive={currentStyle.has('STRIKETHROUGH')}
            >
                <StrikethroughIcon/>
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleInlineStyle('SUPERSCRIPT')} 
                isActive={currentStyle.has('SUPERSCRIPT')}
            >
                <SuperscriptIcon/>
            </ControlButton>
            <ControlButton
                onMouseDown={props.toggleCode} 
                isActive={currentStyle.has('CODE')}
            >
                <CodeIcon/>
            </ControlButton>
            <ControlButton
                onMouseDown={props.showLinkInput}
            >
                <LinkIcon/>
            </ControlButton>
        </React.Fragment>
    );
};

const LinkInput = styled.input`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 14px;
    background-color: ${styleConstants.colorInputBackground};
    color: ${styleConstants.colorBodyText};
    margin: 4px;
    height: 32px;
    border-radius: 3px;
    border: none;
    text-indent: 16px;
`;

const ConfirmButton = styled.button`
    padding: 8px;
    border-radius: 3px;
    border: none;
    background-color: #555;
    color: ${styleConstants.colorSecondary};
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 14px;
    width: 32px;
    height: 32px;
    margin: 4px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    padding: 8px;
    border-radius: 3px;
    border: none;
    background-color: #555;
    color: ${styleConstants.colorSecondary};
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 14px;
    width: 32px;
    height: 32px;
    margin: 4px;
    cursor: pointer;
`;

const LinkControls = props => (
    <React.Fragment>
        <LinkInput 
            type="text"
            value={props.linkUrl}
            placeholder="Enter a URL..."
            onChange={props.updateLinkUrl}
            innerRef={props.linkInputNodeRef}
        />
        <CancelButton
            onMouseDown={props.hideLinkInput}
        >X</CancelButton>
        <ConfirmButton
            onMouseDown={props.createLink}
        >Ok</ConfirmButton>
    </React.Fragment>
);

// onMouseDown={e => e.preventDefault()}

// const ControlViewSwitch = props => (
//     <ControlsContainer
//         isShowing={props.isShowing}
//         innerRef={props.controlsContainerNodeRef}
//     >
//         {
//             props.isShowingLinkInput ? (
//                 <LinkControls 
//                     linkUrl={props.linkUrl}
//                     updateLinkUrl={props.updateLinkUrl}
//                     hideLinkInput={props.hideLinkInput}
//                     linkInputNodeRef={props.linkInputNodeRef}
//                     createLink={props.createLink}
//                 />
//             ) : (
//                 <InlineStyleControls 
//                     {...props}
//                 />
//             )
//         }
//     </ControlsContainer>
// )

const InlineStyleControls = props => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    if (props.isShowingLinkInput) {
        return (
            <ControlsContainer
                isShowing={props.isShowing}
                innerRef={props.controlsContainerNodeRef}
            >
                <LinkControls 
                    linkUrl={props.linkUrl}
                    updateLinkUrl={props.updateLinkUrl}
                    hideLinkInput={props.hideLinkInput}
                    linkInputNodeRef={props.linkInputNodeRef}
                    createLink={props.createLink}
                />
            </ControlsContainer>
        );
    } else {
        return (
            <ControlsContainer
                isShowing={props.isShowing}
                innerRef={props.controlsContainerNodeRef}
            >
                <InlineStyleButtons {...props} />
            </ControlsContainer>
        );
    }
}


// const ControlViewSwitch = props => {
//     if (props.isShowingLinkInput) {
//         return (
//             <LinkControls 
//                 linkUrl={props.linkUrl}
//                 updateLinkUrl={props.updateLinkUrl}
//                 toggleLinkInput={props.toggleLinkInput}
//             />
//         );
//     } else {
//         return (
//             <InlineStyleControls 

//             />
//         );
//     }
// }

/*
Total width of container is 280
*/

class InlineStyleControlsContainer extends Component {
    constructor(props) {
        super(props);
        this.controlsContainerNode = React.createRef();
        this.linkInputNode = React.createRef();
        this.calculateLeftOffset = this.calculateLeftOffset.bind(this);
        this.calculateTopOffset = this.calculateTopOffset.bind(this);
        this.calculateShouldShowToolbar = this.calculateShouldShowToolbar.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.debouncedhandleResize = debounce(this.handleResize, 10, { leading: true, trailing: true });
        this.showLinkInput = this.showLinkInput.bind(this);
        this.hideLinkInput = this.hideLinkInput.bind(this);
        this.updateLinkUrl = this.updateLinkUrl.bind(this);
        this.createLink = this.createLink.bind(this);
        this.state = {
            isShowingLinkInput: false,
            linkUrl: ''
        };
    }

    static propTypes = {
        getEditorState: PropTypes.func.isRequired,
        editorState: PropTypes.any.isRequired,
        toggleInlineStyle: PropTypes.func.isRequired,
        toggleCode: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (typeof window !== null) {
            window.addEventListener('resize', this.debouncedhandleResize);
        }
    }

    componentWillUnmount() {
        if (typeof window !== null) {
            window.removeEventListener('resize', this.debouncedhandleResize);
        }
    }

    componentDidUpdate() {
        if (
            this.state.isShowingLinkInput || 
            this.props.editorState.getSelection().isCollapsed()
        ) {
            return;
        }
        const windowSelection = window.getSelection();
        console.log(windowSelection);
        if (windowSelection.rangeCount < 1) {
            return;
        }
        //
        if (windowSelection.isCollapsed) {
            //return;
        }
        const selectionRect = windowSelection.getRangeAt(0).getBoundingClientRect();
        //console.log(selectionRect);
        const containerNode = this.controlsContainerNode.current;
        const containerRect = containerNode.getBoundingClientRect();
        const topOffset = this.calculateTopOffset(selectionRect);
        const leftOffset = this.calculateLeftOffset(selectionRect);
        containerNode.style.top = `${topOffset}px`;
        containerNode.style.left = `${leftOffset}px`;
    }

    showLinkInput(e) {
        e.preventDefault();
        this.setState({ isShowingLinkInput: true },
        () => {
            this.linkInputNode.current.focus();
        }, 0);
    }

    hideLinkInput(e) {
        e.preventDefault();
        this.setState({ isShowingLinkInput: false }, this.props.focusEditor);
        //this.props.focusEditor();
    }

    updateLinkUrl(e) {
        e.preventDefault();
        this.setState({ linkUrl: e.target.value });
    }

    createLink(e) {
        e.preventDefault();
        this.props.createLinkEntity(this.state.linkUrl);
        this.setState({ isShowingLinkInput: false, linkUrl: '' });
    }

    handleResize(e) {
        const selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        const newTopOffset = this.calculateTopOffset(selectionRect);
        const newLeftOffset = this.calculateLeftOffset(selectionRect);
        const actualNode = this.controlsContainerNode.current;
        actualNode.style.top = `${newTopOffset}px`;
        actualNode.style.left = `${newLeftOffset}px`;
    }

    calculateShouldShowToolbar() {
        return (
            !this.props.getEditorState().getSelection().isCollapsed() &&
            typeof window !== null &&
            !window.getSelection().isCollapsed
        );
    }

    // calculateTopOffset() {
    //     let topOffset = 0;
    //     const windowSelection = window.getSelection();
    //     // if nothing is actually selected, just return topOffset with its default value
    //     if (windowSelection.isCollapsed) return topOffset;
    //     // else make the necessary calculations
    //     const selectionRect = windowSelection.getRangeAt(0).getBoundingClientRect();
    //     topOffset = selectionRect.top + selectionRect.height + 16 + window.scrollY;
    //     return topOffset;
    // }

    calculateTopOffset(selectionRect) {
        return selectionRect.top + selectionRect.height + 16 + window.scrollY;   
    }

    calculateLeftOffset(selectionRect) {
        let leftOffset = 0;
        let adjustedLeftOffset;
        const windowWidth = document.body.clientWidth;
        leftOffset = selectionRect.left + (selectionRect.width /2) - 140;
        if (leftOffset < 16) {
            adjustedLeftOffset = 16;
        } else if (leftOffset + 280 > windowWidth - 16) {
            adjustedLeftOffset = windowWidth - 296;
        } else {
            adjustedLeftOffset = leftOffset;
        }
        return adjustedLeftOffset;
    }

    // calculateLeftOffset() {
    //     let leftOffset = 0;
    //     let adjustedLeftOffset;
    //     const windowSelection = window.getSelection();
    //     // if nothing is actually selected, just return topOffset with its default value
    //     if (windowSelection.isCollapsed) return leftOffset;
    //     // else make the necessary calculations
    //     const selectionRect = windowSelection.getRangeAt(0).getBoundingClientRect();
    //     const windowWidth = document.body.clientWidth;
    //     leftOffset = selectionRect.left + (selectionRect.width /2) - 140;
    //     if (leftOffset < 16) {
    //         adjustedLeftOffset = 16;
    //     } else if (leftOffset + 280 > windowWidth - 16) {
    //         adjustedLeftOffset = windowWidth - 296;
    //     } else {
    //         adjustedLeftOffset = leftOffset;
    //     }
    //     return adjustedLeftOffset;
    // }

    render() {
        // let topOffset = '0px';
        // let leftOffset = '0px';
        //const shouldShowToolbar = this.calculateShouldShowToolbar();
        const shouldShowToolbar = !this.props.editorState.getSelection().isCollapsed();
        // if (shouldShowToolbar) {
        //     topOffset = this.calculateTopOffset();
        //     leftOffset = this.calculateLeftOffset();
        // }

        return (
            <InlineStyleControls 
                isShowing={shouldShowToolbar}
                controlsContainerNodeRef={this.controlsContainerNode}
                editorState={this.props.editorState}
                toggleInlineStyle={this.props.toggleInlineStyle}
                toggleCode={this.props.toggleCode}
                isShowingLinkInput={this.state.isShowingLinkInput}
                linkUrl={this.state.linkUrl}
                showLinkInput={this.showLinkInput}
                hideLinkInput={this.hideLinkInput}
                updateLinkUrl={this.updateLinkUrl}
                linkInputNodeRef={this.linkInputNode}
                createLink={this.createLink}
            />
        );
    }
}

export default InlineStyleControlsContainer;
