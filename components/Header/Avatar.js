import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const LinkWrapper = styled.a`
    display: inline-block;
    height: 40px;
    width: 40px;
    margin-left: auto;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    cursor: pointer;
    svg {
        fill: ${styleConstants.colorPrimary}
    }
`;

const Placeholder = props => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 746.7 746.7">
        <title>avatar-icon-knockout</title>
        <g id="Layer_2" data-name="Layer 2">
            <path d="M408,34.69C201.84,34.69,34.69,201.84,34.69,408a371.55,371.55,0,0,0,53.8,193.18c65.42,108,184.06,180.17,319.55,180.17,136.47,0,255.84-73.22,321-182.51A371.58,371.58,0,0,0,781.39,408C781.39,201.84,614.24,34.69,408,34.69Zm0,54c115.6,0,209.3,93.71,209.3,209.3S523.64,507.34,408,507.34,198.74,413.64,198.74,298,292.45,88.74,408,88.74ZM698,579.88h0c-58.62,98.41-166.11,164.33-289,164.33-122,0-228.83-65-287.73-162.23l-1.07-1.78a56.66,56.66,0,0,1-.82-56.56,332,332,0,0,1,53.21-71.28A43.58,43.58,0,0,1,236,453.6a231.92,231.92,0,0,0,344.87-.92,43.58,43.58,0,0,1,63.38-1.52,332.12,332.12,0,0,1,54.63,72.92A56,56,0,0,1,698,579.88Z" transform="translate(-34.69 -34.69)"/>
        </g>
    </svg>
);

const Avatar = props => {
    const currentUserModel = props.users[props.currentUser._id];
    return (
        <LinkWrapper onClick={props.handleClick}>
            {currentUserModel.avatar ? <Image src={currentUserModel.avatar}/> : <Placeholder />}
        </LinkWrapper>
    );
};

Avatar.propTypes = {
    handleClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    users: state.users.models
});

export default connect(mapStateToProps)(Avatar);