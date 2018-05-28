import { connect } from 'react-redux';
import SimpleHighlightBlock from './SimpleHighlightBlock';

const SimpleHighlightBlockContainer = props => {
    const highlight = props.highlights[props._id];
    return <SimpleHighlightBlock 
        excerpt={highlight.excerpt}
        article_id={highlight.post}
    />
};

const mapStateToProps = state => ({
    highlights: state.highlights
});

export default connect(mapStateToProps)(SimpleHighlightBlockContainer)