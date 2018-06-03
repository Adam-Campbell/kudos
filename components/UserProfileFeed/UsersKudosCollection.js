import PropTypes from 'prop-types';
import SimpleKudosBlock from '../SimpleKudosBlock';

const UsersKudosCollection = props => (
    <div>
        {props.kudos_ids.map((article_id, index) => (
            <SimpleKudosBlock article_id={article_id} key={index} />
        ))}
    </div>
);

UsersKudosCollection.propTypes = {
    kudos_ids: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UsersKudosCollection;