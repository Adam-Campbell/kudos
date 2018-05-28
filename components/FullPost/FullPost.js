import Link from 'next/link';
import KudosButton from './KudosButton';

const FullPost = ({_id, image, categories, title, text, kudos, authorUsername, author_id, isLoggedIn}) => (
    <div>
        <img src={image} />
        <h2>{title}</h2>
        <Link as={`/user/${author_id}`} href={`/user?user=${author_id}`}>
            <a>{authorUsername}</a>
        </Link>
        <p>{kudos} Kudos</p>
        {isLoggedIn && <KudosButton _id={_id}/>}
        {categories.map((category, index) => (
            <p key={index}>{category}</p>
        ))}
        <p>{text}</p>
    </div>
);

export default FullPost;