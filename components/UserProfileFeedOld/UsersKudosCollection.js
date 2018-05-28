import Kudos from '../Kudos';

const UsersKudosCollection = props => (
    <div>
        {props.kudosIds.map((kudosId, index) => (
            <Kudos key={index} _id={kudosId}/>
        ))}
    </div>
);

export default UsersKudosCollection;
