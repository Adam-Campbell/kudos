import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const StyledLink = styled.a`
    color: ${styleConstants.colorPrimary};
    &:hover {
        color: ${styleConstants.colorPrimaryAlt};
    }
`;

const LinkDecorator = props => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <StyledLink href={url}>{props.children}</StyledLink>
};

export default LinkDecorator;