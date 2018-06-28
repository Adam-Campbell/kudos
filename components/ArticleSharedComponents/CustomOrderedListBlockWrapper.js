import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledWrapper = styled.div`
    max-width: 832px;
    margin: 0 auto;
    padding: 16px; 
`;

const StyledOL = styled.ol`
    padding-left: 16px;
    margin: 0;
`;

export const CustomOrderedListBlockWrapper = props => (
    <StyledWrapper>
        <StyledOL>
            {props.children}
        </StyledOL>
    </StyledWrapper>
);