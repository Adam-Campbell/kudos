import { 
    BoldIcon, 
    ItalicIcon, 
    UnderlineIcon,
    StrikethroughIcon,
    SuperscriptIcon, 
} from './Icons';
import ControlButton from './ControlButton';

// propTypes
// handleToggle - func
// editorState - object

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

export default InlineStyleControls;