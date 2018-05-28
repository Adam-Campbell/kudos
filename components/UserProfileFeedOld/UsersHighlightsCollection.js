import Highlight from '../Highlight';

const UsersHighlightsCollection = props => (
    <div>
        {props.highlightIds.map((highlightId, index) => (
            <Highlight 
                key={index}
                _id={highlightId}
            />
        ))}
    </div>
);

export default UsersHighlightsCollection;