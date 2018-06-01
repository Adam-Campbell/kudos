import { connect } from 'react-redux';
import DeletedComment from './DeletedComment';
import CommentContainer from './CommentContainer';
import OwnCommentContainer from './OwnCommentContainer';

/*

TODO

Get rid of OwnComment and Comment (delete files and remove any references from imports etc).
I have split these into seperate container and presenter components. Change the names of the 
presenter components to remove the word presenter, so CommentPresenter just becomes Comment
etc. Remember to change the name of the file but also the name of the actual component that
it is exporting. Also adjust the imports afterwards so that everything matches.

Still have to adjust the Buttons as well - some of them will need some margin as they are
touching each other. 

*/

const CommentSelector = props => {
    const comment = props.comments[props._id];
    const isAuthor = (props.isLoggedIn && comment.author === props.currentUser_id);
    if (isAuthor) {
        return  <OwnCommentContainer _id={props._id} />
    } else if (!comment.author) {
        return <DeletedComment commentParentsLength={comment.parents.length} />
    } else {
        return <CommentContainer _id={props._id} />
    }
};

const mapStateToProps = state => ({
    comments: state.comments,
    isLoggedIn: state.currentUser.isLoggedIn,
    currentUser_id: state.currentUser._id
});

export default connect(mapStateToProps)(CommentSelector);