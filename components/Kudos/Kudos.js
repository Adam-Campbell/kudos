import Link from 'next/link';

const Kudos = ({post_id, title, description, authorUsername, author_id}) => (
    <div>
        <h2>{title}</h2>
        <Link as={`/user/${author_id}`} href={`/user?user=${author_id}`}>
            <a>{authorUsername}</a>
        </Link>
        <p>{description}</p>
        <Link as={`/post/${post_id}`} href={`/post?post=${post_id}`}>
            <a>Read More</a>
        </Link>
    </div>
);

export default Kudos;