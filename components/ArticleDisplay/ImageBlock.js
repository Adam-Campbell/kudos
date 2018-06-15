import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

const Figure = styled.figure`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 0;
    max-width: ${props => props.fullWidth ? '100%' : '800px'};
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
    border-top: solid 3px ${styleConstants.colorPrimary};
    border-bottom: solid 3px ${styleConstants.colorPrimary};
`;

const ImageBlock = props => {
    const currentEntity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const { images, fullWidth } = currentEntity.getData();
    const src = images.original.imageUrl
    return (
        <Figure fullWidth={fullWidth}>
            <Image src={src} />
        </Figure>
    );
}

export default ImageBlock;