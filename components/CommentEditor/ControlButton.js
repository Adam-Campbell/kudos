import styled from 'styled-components';

const ControlButton = styled.button`
    background-color: ${props => props.isActive ? '#ddd' : '#eee'};
    border: solid 2px;
    border-color: ${props => props.isActive ? '#ddd' : '#eee'};
    border-radius: 3px;
    padding: 4px;
    width: 32px;
    height: 32px;
    margin-top: 4px;
    margin-bottom: 4px;
    cursor: pointer;
    svg {
        fill: #333;
    }
`;

export default ControlButton;