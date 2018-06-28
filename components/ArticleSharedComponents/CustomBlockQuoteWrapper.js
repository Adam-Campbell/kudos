import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledDiv = styled.div`
    max-width: 832px;
    margin: 16px auto;
    padding: 16px;
`;

const StyledInner = styled.div`
    border-left: solid ${styleConstants.colorBodyText} 4px;
    padding-left: 16px;
`;

export const CustomBlockQuoteWrapper = props => (
    <StyledDiv>
        <StyledInner>
            {props.children}
        </StyledInner>
    </StyledDiv>
);
