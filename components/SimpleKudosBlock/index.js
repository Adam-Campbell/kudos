import { connect } from 'react-redux';
import SimpleKudosBlock from './SimpleKudosBlock';

const SimpleKudosBlockContainer = props => {
    const article = props.articles[props._id];
    return <SimpleKudosBlock 
        articleTitle={article.title}
        articleDescription={article.description}
        article_id={article._id}
    />
};

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(mapStateToProps)(SimpleKudosBlockContainer)