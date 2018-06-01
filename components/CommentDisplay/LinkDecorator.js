import styled from 'styled-components';

const StyledLink = styled.a`
    color: seagreen;

`;

const LinkDecorator = props => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <StyledLink href={url}>{props.children}</StyledLink>
};

export default LinkDecorator;