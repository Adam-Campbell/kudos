import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { 
    Editor,
    DefaultDraftBlockRenderMap
} from 'draft-js';
import CustomCodeBlockWrapper from './CustomCodeBlockWrapper';
import CenteredBlockWrapper from './CenteredBlockWrapper';
import { 
    Label, 
    Select, 
    Option,
    FileInput,
    FileInputLabel,
    ArticleTitleTextarea,
    ArticleDescriptionTextarea
} from '../Forms';

const Immutable = require('immutable');

const EditorModuleInnerContainer = styled.div`
    
`;

const EditorTextBoxContainer = styled.div`
    cursor: text;
`;


/*
    Custom blockRenderMap declared. This controls the element and wrapper element that are rendered when
    a specific blockType is selected. Is then merged with the default map so we don't lose any of the 
    default mappings (except the ones we purposefully want to override).
*/
const blockRenderMap = Immutable.Map({
    'code-block': { element: 'pre', wrapper: <CustomCodeBlockWrapper />},
    'unstyled': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'header-one': { element: 'div', wrapper: <CenteredBlockWrapper /> },
    'header-two': { element: 'div', wrapper: <CenteredBlockWrapper /> }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);



const styleMap = {
    'SUPERSCRIPT': {
        verticalAlign: 'super',
        fontSize: 'smaller',
        lineHeight: 'normal'
    }
};

const ArticleEditor = props => (
    <EditorModuleInnerContainer>
        <EditorTextBoxContainer>
            <Editor
                editorKey="articleEditor"
                editorState={props.editorState} 
                onChange={props.onChange}
                blockStyleFn={props.customBlockStyles}
                blockRenderMap={extendedBlockRenderMap}
                customStyleMap={styleMap}
                blockRendererFn={props.blockRendererFn}
                readOnly={true}
            />
        </EditorTextBoxContainer>
    </EditorModuleInnerContainer>
);

ArticleEditor.propTypes = {
    editorState: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    customBlockStyles: PropTypes.func.isRequired,
};

export default ArticleEditor;
