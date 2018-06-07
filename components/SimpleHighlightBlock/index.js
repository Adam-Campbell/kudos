import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleHighlightBlock from './SimpleHighlightBlock';

export const SimpleHighlightBlockContainer = props => {
    const highlight = props.highlights[props.highlight_id];
    return <SimpleHighlightBlock 
        excerpt={highlight.excerpt}
        article_id={highlight.post}
    />
};

SimpleHighlightBlockContainer.propTypes = {
    highlight_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    highlights: state.highlights
});

export default connect(mapStateToProps)(SimpleHighlightBlockContainer)