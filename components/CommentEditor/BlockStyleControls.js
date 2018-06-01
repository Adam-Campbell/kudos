import {  
    TitleIcon,
    UnorderedListIcon,
    OrderedListIcon,
    BlockQuoteIcon,
    CodeIcon
} from './Icons';
import ControlButton from './ControlButton';

const BlockStyleControls = props => {
    const selection = props.editorState.getSelection();
    const blockType = props.editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();

    return (
        <React.Fragment>
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

export default BlockStyleControls;