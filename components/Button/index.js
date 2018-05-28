import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

export const Button = styled.button`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 14px;
    background-color: ${styleConstants.colorSecondary};
    color: ${styleConstants.colorPrimary};
    border: solid 2px ${styleConstants.colorPrimary};
    border-radius: 3px;
    padding: 4px 16px;
    text-decoration: none;
    transition: all ease 0.25s;
    cursor: pointer;
    &:hover {
        color: ${styleConstants.colorSecondary};
        background-color:  ${styleConstants.colorPrimary};
        border-color:  ${styleConstants.colorPrimary};
    }
`;

export const AnchorButton = Button.withComponent('a');