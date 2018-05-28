import Link from 'next/link';

const UserLinks = props => (
    <React.Fragment>
        {
            props.hasFetched &&
            <img src=
                {props.currentUserModel.avatar} 
                style={{width: '50px', height: 'auto', borderRadius: '25px'}}
            />
        }
        
        <Link as={`/user/${props.currentUserModel._id}`} href={`/user?user=${props.currentUserModel._id}`}>
            <a>View Profile</a>
        </Link> 
        <Link href="/account-details">
            <a>Edit Account Details</a>
        </Link>
        <Link href="/new-post">
            <a>  +  </a>
        </Link>
        <button onClick={props.handleClick}>Log Out</button> 
    </React.Fragment>
);

export default UserLinks;
