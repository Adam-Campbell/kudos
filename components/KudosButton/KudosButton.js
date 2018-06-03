import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-regular/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-regular/faThumbsDown';

const ButtonOuter = styled.span`
    display: inline-block;
    max-width: 32px;
    max-height: 32px;
    font-size: 1.5rem;
    cursor: pointer;
    svg {
        color: ${props => props.remove ? styleConstants.colorWarning : styleConstants.colorPrimary };
    }
`;

const KudosButton = props => {
    return props.hasGivenKudos ? (
        <ButtonOuter remove onClick={props.removeKudos}>
            <FontAwesomeIcon icon={faThumbsDown}/>
        </ButtonOuter>
    ) : (
        <ButtonOuter onClick={props.giveKudos}>
            <FontAwesomeIcon icon={faThumbsUp}/>
        </ButtonOuter>
    )
}

KudosButton.propTypes = {
    hasGivenKudos: PropTypes.bool.isRequired,
    giveKudos: PropTypes.func.isRequired,
    removeKudos: PropTypes.func.isRequired
};

export default KudosButton;