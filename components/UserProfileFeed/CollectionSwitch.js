import { connect } from 'react-redux';
import SimpleArticleBlock from '../SimpleArticleBlock';
import SimpleCommentBlock from '../SimpleCommentBlock';
import SimpleKudosBlock from '../SimpleKudosBlock';
import SimpleHighlightBlock from '../SimpleHighlightBlock';

const UsersArticlesCollection = props => (
    <div>
        {props.article_ids.map((_id, index) => (
            <SimpleArticleBlock _id={_id} key={index} />
        ))}
    </div>
);

const UsersCommentsCollection = props => (
    <div>
        {props.comment_ids.map((_id, index) => (
            <SimpleCommentBlock _id={_id} key={index} />
        ))}
    </div>
);

const UsersKudosCollection = props => (
    <div>
        {props.kudos_ids.map((_id, index) => (
            <SimpleKudosBlock _id={_id} key={index} />
        ))}
    </div>
);

const UsersHighlightsCollection = props => (
    <div>
        {props.highlight_ids.map((_id, index) => (
            <SimpleHighlightBlock _id={_id} key={index} />
        ))}
    </div>
);

const CollectionSwitch = props => {
    const user = props.users[props.user_id];

    switch (props.filter) {
        case 'posts':
            return <UsersArticlesCollection article_ids={user.postIds} />

        case 'comments':
            return <UsersCommentsCollection comment_ids={user.commentIds} />

        case 'kudos':
            return <UsersKudosCollection kudos_ids={user.kudosIds} />

        case 'highlights':
            return <UsersHighlightsCollection highlight_ids={user.highlightIds} />

        default:
            return <UsersArticlesCollection article_ids={user.postIds} />
    }
}

const mapStateStateToProps = state => ({
    users: state.users.models
});

export default connect(mapStateStateToProps)(CollectionSwitch);
