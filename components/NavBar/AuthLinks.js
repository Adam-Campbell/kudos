import Link from 'next/link';

const AuthLinks = () => (
    <React.Fragment>
        <Link href="/signin">
            <a>Sign In</a>
        </Link> 
        <Link href="/signup">
            <a>Sign Up</a>
        </Link> 
    </React.Fragment>
);

export default AuthLinks;