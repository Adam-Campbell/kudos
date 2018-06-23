import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledDiv = styled.div`
    max-width: 832px;
    margin: 0 auto;
    padding: 16px;
`;

const CenteredBlockWrapper = props => (
    <StyledDiv>{props.children}</StyledDiv>
);

export default CenteredBlockWrapper;