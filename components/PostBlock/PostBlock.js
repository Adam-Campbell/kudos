import Link from 'next/link';

const PostBlock = ({_id, image, categories, title, description, authorUsername, author_id}) => (
    <div>
        <img src={image} />
        <h2>{title}</h2>
        <Link as={`/user/${author_id}`} href={`/user?user=${author_id}`}>
            <a>{authorUsername}</a>
        </Link>
        <p>{description}</p>
        {categories.map((category, index) => (
            <p key={index}>{category}</p>
        ))}
        <Link as={`/post/${_id}`} href={`/post?post=${_id}`}>
            <a>Read More</a>
        </Link>
    </div>
);

export default PostBlock;