import { connect } from 'react-redux';
import Highlight from './Highlight';

const HighlightContainer = props => {
    const highlight = props.highlights[props._id];
    return <Highlight 
        post_id={highlight.post}
        excerpt={highlight.excerpt}
    />
};

const mapStateToProps = state => ({
    highlights: state.highlights
});

export default connect(mapStateToProps)(HighlightContainer);