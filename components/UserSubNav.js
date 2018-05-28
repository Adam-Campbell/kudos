import Link from 'next/link';

const UserSubNav = ({_id}) => (
    <nav>
        <ul>
            <li>
                <Link as={`/user/${_id}/posts`} href={`/user?user=${_id}&filter=posts`}>
                    <a>Posts</a>
                </Link>
            </li>
            <li>
                <Link as={`/user/${_id}/comments`} href={`/user?user=${_id}&filter=comments`}>
                    <a>Comments</a>
                </Link>
            </li>
            <li>
                <Link as={`/user/${_id}/kudos`} href={`/user?user=${_id}&filter=kudos`}>
                    <a>Kudos</a>
                </Link>
            </li>
            <li>
                <Link as={`/user/${_id}/highlights`} href={`/user?user=${_id}&filter=highlights`}>
                    <a>Highlights</a>
                </Link>
            </li>
        </ul>
    </nav>
);

export default UserSubNav;