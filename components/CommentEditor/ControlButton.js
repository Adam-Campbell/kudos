import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as styleConstants from '../styleConstants';

const ControlButton = styled.button`
    background-color: ${props => props.isActive ? 
        `${styleConstants.colorInputActive}` : 
        `${styleConstants.colorInputBackground}`
    };
    border: solid 2px;
    border-color: ${props => props.isActive ? 
        `${styleConstants.colorInputActive}` : 
        `${styleConstants.colorInputBackground}`
    };
    border-radius: 3px;
    padding: 4px;
    width: 32px;
    height: 32px;
    margin-top: 4px;
    margin-bottom: 4px;
    cursor: pointer;
    svg {
        fill: ${styleConstants.colorBodyText};
    }
`;

ControlButton.propTypes = {
    isActive: PropTypes.bool.isRequired
};

export default ControlButton;