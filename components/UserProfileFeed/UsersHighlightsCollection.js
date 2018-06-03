import PropTypes from 'prop-types';
import SimpleHighlightBlock from '../SimpleHighlightBlock';

const UsersHighlightsCollection = props => (
    <div>
        {props.highlight_ids.map((highlight_id, index) => (
            <SimpleHighlightBlock highlight_id={highlight_id} key={index} />
        ))}
    </div>
);

UsersHighlightsCollection.propTypes = {
    highlight_ids: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UsersHighlightsCollection;