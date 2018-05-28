import Link from 'next/link';

const PostComment = (props) => (
    <div>
        <div style={{marginLeft: `${props.depth * 25}px`}}>
            <Link as={`/user/${props.author_id}`} href={`/user?user=${props.author_id}`}>
                <a>{props.authorUsername}</a>
            </Link>
            <p>{props.text}</p>
            <span>{props.createdAt}</span>
            {
                props.author_id === props.currentUser_id && 
                <button 
                    onClick={() => props.deleteComment(props._id, props.currentUser_id, props.token)}
                >Delete</button>
            }
            {props.isLoggedIn && <button onClick={props.toggleForm}>Reply</button>}
            {props.children}
        </div>
    </div>
);

export default PostComment;