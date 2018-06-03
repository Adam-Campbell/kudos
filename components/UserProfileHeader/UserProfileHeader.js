import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import FollowButton from '../FollowButton'

const OuterContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    @media(min-width: 600px) {
        flex-direction: row;
    }
`;

const UserImage = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 80px;
    margin-bottom: 16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${props => `url('${props.imageUrl}')`};
    @media(min-width: 600px) {
        margin-bottom: initial;
        margin-right: 16px;
    }
`;

const InfoContainer = styled.div`
    
`;

const Username = styled.h1`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 24px;
    color: ${styleConstants.colorBodyText};
    margin-top: 0;
    margin-bottom: 8px;
    text-transform: capitalize;
`;

const UserBio = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 16px;
    color: ${styleConstants.colorBodyText};
    margin-top: 4px;
    margin-bottom: 4px;
    line-height: 1.4;
`;

const FollowStatsContainer = styled.div`

`;

const FollowStat = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 14px;
    color: ${styleConstants.colorBodyText};
    display: inline-block;
    span {
        font-weight: 400;
        color: ${styleConstants.colorPrimary};
    }
    & + & {
        margin-left: 16px;
    }
`;

const UserProfileHeader = props => (
    <OuterContainer>
        <UserImage imageUrl={props.userAvatar}/>
        <InfoContainer>
            <Username>{props.username}</Username>
            <UserBio>{props.userBio}</UserBio>
            <FollowStatsContainer>
                <FollowStat><span>{props.userFollowers}</span> Followers</FollowStat>
                <FollowStat><span>{props.userFollowing}</span> Following</FollowStat>
            </FollowStatsContainer>
            <FollowButton user_id={props.user_id}/>
        </InfoContainer>
    </OuterContainer>
);

UserProfileHeader.propTypes = {
    userAvatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userBio: PropTypes.string.isRequired,
    userFollowers: PropTypes.number.isRequired,
    userFollowing: PropTypes.number.isRequired,
    user_id: PropTypes.string.isRequired
};

export default UserProfileHeader;
