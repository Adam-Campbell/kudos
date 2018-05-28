import Link from 'next/link';

const Highlight = ({post_id, excerpt}) => (
    <div>
        <Link as={`/post/${post_id}`} href={`/post?post=${post_id}`}>
            <a>View post</a>
        </Link>
        <p>{excerpt}</p>
    </div>
);

export default Highlight;
