import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledWrapper = styled.div`
    max-width: 832px;
    margin: 0 auto;
    padding: 16px; 
`;

const StyledUL = styled.ul`
    padding-left: 16px;
    margin: 0;
`;

const CustomUnorderedListBlockWrapper = props => (
    <StyledWrapper>
        <StyledUL>
            {props.children}
        </StyledUL>
    </StyledWrapper>
);

export default CustomUnorderedListBlockWrapper;