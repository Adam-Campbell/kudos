import PropTypes from 'prop-types';
import SimpleArticleBlock from '../SimpleArticleBlock';

const UsersArticlesCollection = props => (
    <div>
        {props.article_ids.map((article_id, index) => (
            <SimpleArticleBlock article_id={article_id} key={index} />
        ))}
    </div>
);

UsersArticlesCollection.propTypes = {
    article_ids: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UsersArticlesCollection;