import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledPre = styled.pre`
    padding: 16px;
    border-radius: 3px;
    background-color: ${styleConstants.colorBodyText};
    margin: 32px 16px;
`;

const CustomCodeBlockWrapper = props => (
    <StyledPre>{props.children}</StyledPre>
);

export default CustomCodeBlockWrapper;