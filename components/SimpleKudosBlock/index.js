import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleKudosBlock from './SimpleKudosBlock';

export const SimpleKudosBlockContainer = props => {
    const article = props.articles[props.article_id];
    return <SimpleKudosBlock 
        articleTitle={article.title}
        articleDescription={article.description}
        article_id={article._id}
    />
};

SimpleKudosBlockContainer.propTypes = {
    article_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(mapStateToProps)(SimpleKudosBlockContainer)