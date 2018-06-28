import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { 
    Editor,
    DefaultDraftBlockRenderMap
} from 'draft-js';
import CustomCodeBlockWrapper from './CustomCodeBlockWrapper';
import CustomUnstyledBlockWrapper from './CustomUnstyledBlockWrapper';
import CustomTitleBlockWrapper from './CustomTitleBlockWrapper';
import CustomDescriptionBlockWrapper from './CustomDescriptionBlockWrapper';
import EditorControls from './EditorControls';
import { Wrapper } from '../Layout';
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

const EditorModuleOuterContainer = styled.div`
    padding: 16px;
`;

const EditorModuleInnerContainer = styled.div`
    background-color: ${styleConstants.colorSecondary};
    border: solid 2px ${styleConstants.colorBodyText};
    border-radius: 3px;
    position: relative;
`;

const EditorTextBoxContainer = styled.div`
    min-height: 160px;
    cursor: text;
`;


/*
    Custom blockRenderMap declared. This controls the element and wrapper element that are rendered when
    a specific blockType is selected. Is then merged with the default map so we don't lose any of the 
    default mappings (except the ones we purposefully want to override).
*/
const blockRenderMap = Immutable.Map({
    'code-block': { element: 'pre', wrapper: <CustomCodeBlockWrapper />},
    'unstyled': { element: 'div', wrapper: <CustomUnstyledBlockWrapper /> },
    'header-one': { element: 'div', wrapper: <CustomTitleBlockWrapper /> },
    'header-two': { element: 'div', wrapper: <CustomDescriptionBlockWrapper /> }
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);



const styleMap = {
    'SUPERSCRIPT': {
        verticalAlign: 'super',
        fontSize: 'smaller',
        lineHeight: 'normal'
    }
};

const ExperimentEditor = props => (
    <React.Fragment>
        <div>
            <Label htmlFor="category">Choose a Category:</Label>
            <Select
                id="category"
                name="category"
                value={props.articleCategory}
                onChange={props.handleCategoryUpdate}
            >
                <Option value="">Choose One:</Option>
                <Option value="javascript">JavaScript</Option>
                <Option value="fantasy">Fantasy</Option>
                <Option value="games">Games</Option>
                <Option value="news">News</Option>
                <Option value="fashion">Fashion</Option>
                <Option value="travel">Travel</Option>
                <Option value="motivation">Motivation</Option>
                <Option value="relationships">Relationships</Option>
                <Option value="design">Design</Option>
                <Option value="politics">Politics</Option>
                <Option value="mentalhealth">Mental Health</Option>
                <Option value="music">Music</Option>
            </Select>
        </div>
        <EditorModuleInnerContainer>
            <EditorTextBoxContainer onClick={props.focusEditor}>
                <Editor
                    editorKey="articleEditor"
                    editorState={props.editorState} 
                    onChange={props.onChange}
                    placeholder="Tell a story..."
                    ref={props.setEditorRef}
                    blockStyleFn={props.customBlockStyles}
                    handleKeyCommand={props.handleKeyCommand}
                    blockRenderMap={extendedBlockRenderMap}
                    customStyleMap={styleMap}
                    blockRendererFn={props.blockRendererFn}
                />
            </EditorTextBoxContainer>
            <EditorControls 
                editorState={props.editorState}
                toggleInlineStyle={props.toggleInlineStyle}
                toggleCode={props.toggleCode}
                changeBlockType={props.changeBlockType}
                linkMenuIsOpen={props.linkMenuIsOpen}
                linkUrl={props.linkUrl}
                updateLinkUrl={props.updateLinkUrl}
                toggleLinkMenu={props.toggleLinkMenu}
                createLink={props.createLinkEntity}
                handleSubmit={props.handleSubmit}
                addImageBlock={props.addImageBlock}
                logRaw={props.logRaw}
            />
        </EditorModuleInnerContainer>
    </React.Fragment>
);

ExperimentEditor.propTypes = {
    editorState: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    setEditorRef: PropTypes.func.isRequired,
    customBlockStyles: PropTypes.func.isRequired,
    handleKeyCommand: PropTypes.func.isRequired,
    toggleInlineStyle: PropTypes.func.isRequired,
    toggleCode: PropTypes.func.isRequired,
    changeBlockType: PropTypes.func.isRequired,
    linkMenuIsOpen: PropTypes.bool.isRequired,
    linkUrl: PropTypes.string.isRequired,
    updateLinkUrl: PropTypes.func.isRequired,
    toggleLinkMenu: PropTypes.func.isRequired,
    createLinkEntity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    articleTitle: PropTypes.string.isRequired,
    articleDescription: PropTypes.string.isRequired,
    articleCategory: PropTypes.string.isRequired,
    articleImage: PropTypes.any,
    handleTitleUpdate: PropTypes.func.isRequired,
    handleDescriptionUpdate: PropTypes.func.isRequired,
    handleCategoryUpdate: PropTypes.func.isRequired,
    imageFileInputRef: PropTypes.any,
    checkForFile: PropTypes.func.isRequired,
    focusEditor: PropTypes.func.isRequired
};

export default ExperimentEditor;
