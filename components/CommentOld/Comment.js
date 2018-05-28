import Link from 'next/link';

const Comment = ({text, discussion_id}) => (
    <div>
        <Link as={`/post/${discussion_id}`} href={`/post?post=${discussion_id}`}>
            <a>View discussion</a>
        </Link>
        <p>{text}</p>
    </div>
);

export default Comment;