import Link from 'next/link';
import AuthLinks from './AuthLinks';
import UserLinksContainer from './UserLinksContainer';

const NavBar = ({isLoggedIn, hasFetched}) => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link as="/category/javascript" href="/category?category=javascript">
            <a>JavaScript</a>
        </Link>
        <Link as="/category/fantasy" href="/category?category=fantasy">
            <a>Fantasy</a>
        </Link>
        <Link as="/category/games" href="/category?category=games">
            <a>Games</a>
        </Link>
        <Link as="/category/news" href="/category?category=news">
            <a>News</a>
        </Link>
        <Link as="/category/fashion" href="/category?category=fashion">
            <a>Fashion</a>
        </Link>
        <Link as="/category/travel" href="/category?category=travel">
            <a>Travel</a>
        </Link>
        <Link as="/category/motivation" href="/category?category=motivation">
            <a>Motivation</a>
        </Link>
        <Link as="/category/relationships" href="/category?category=relationships">
            <a>Relationships</a>
        </Link>
        <Link as="/category/design" href="/category?category=design">
            <a>Design</a>
        </Link>
        <Link as="/category/politics" href="/category?category=politics">
            <a>Politics</a>
        </Link>
        <Link as="/category/mentalhealth" href="/category?category=mentalhealth">
            <a>Mental Health</a>
        </Link>
        <Link as="/category/music" href="/category?category=music">
            <a>Mental Health</a>
        </Link>
        {(isLoggedIn && hasFetched) ? <UserLinksContainer /> : <AuthLinks />}
    </div>
);

export default NavBar;