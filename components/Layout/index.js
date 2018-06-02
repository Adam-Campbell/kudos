import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 8px 16px;
    margin-left: auto;
    margin-right: auto;
    ${props => props.flex && `
        display: flex;
        flex-wrap: wrap;
    `}
    max-width: ${props => {
        if (props.tight) {
            return '800px';
        } else if (props.wide) {
            return '1200px'
        } else {
            return '1000px'
        }
    }};
`;

export const Column = styled.div`
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    @media(min-width: 768px) {
        width: 50%;
        &:nth-child(odd) {
            padding-right: 8px;
        }
        &:nth-child(even) {
            padding-left: 8px;
        }
    }
`;