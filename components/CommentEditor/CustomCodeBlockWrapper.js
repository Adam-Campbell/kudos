import styled from 'styled-components';

const StyledPre = styled.pre`
    padding: 16px;
    border-radius: 3px;
    background-color: #333;
    margin: 32px 16px;
`;

const CustomCodeBlockWrapper = props => (
    <StyledPre>{props.children}</StyledPre>
);

export default CustomCodeBlockWrapper;