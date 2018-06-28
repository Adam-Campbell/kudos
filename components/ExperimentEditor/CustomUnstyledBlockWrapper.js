import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledDiv = styled.div`
    max-width: 800px;
    margin: 16px auto;
`;

const CustomUnstyledBlockWrapper = props => (
    <StyledDiv>{props.children}</StyledDiv>
);

export default CustomUnstyledBlockWrapper;