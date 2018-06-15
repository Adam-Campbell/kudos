import React, { Component } from 'react';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { debounce } from 'lodash';

const Container = styled.figure`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 0;
    position: relative;
    overflow: hidden;
    max-width: ${props => props.isFullWidth ? `${props.maxWidth}px` : '800px'};
    border-top: solid 3px ${styleConstants.colorPrimary};
    border-bottom: solid 3px ${styleConstants.colorPrimary};
`;

const RatioHolder = styled.div`
    padding-bottom: ${props => props.ratio};
`;

const Thumbnail = styled.img`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    filter: ${props => props.hasLoaded ? 'none' : 'blur(25px)'};
    transform: scale(1);
`;

const Image = styled.img`
    opacity: ${props => props.hasLoaded ? 1 : 0};
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transition: opacity ease 0.5s;
`;

// const ImageBlock = props => {
//     const currentEntity = props.contentState.getEntity(
//         props.block.getEntityAt(0)
//     );
//     const { images, fullWidth } = currentEntity.getData();
//     const src = images.original.imageUrl
//     return (
//         <Figure fullWidth={fullWidth}>
//             <Image src={src} />
//         </Figure>
//     );
// }

class ImageBlock extends Component {
    constructor(props) {
        super(props);
        this.detectScrolled = this.detectScrolled.bind(this);
        this.constructImage = this.constructImage.bind(this);
        this.debouncedDetectScrolled = debounce(this.detectScrolled, 100, { leading: true, trailing: false });
        const currentEntity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        const { images, fullWidth } = currentEntity.getData();
        this.state = {
            hasLoaded: false,
            isFullWidth: fullWidth,
            fullSizeSrc: images.original.imageUrl,
            thumbnailSrc: images.thumbnail.imageUrl,
            maxWidth: images.original.size.width,
            ratio: images.original.size.height / images.original.size.width * 100
        };
    }

    componentDidMount() {
        this.debouncedDetectScrolled();
        window.addEventListener('scroll', this.debouncedDetectScrolled);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debouncedDetectScrolled);
    }

    detectScrolled() {
        const { innerHeight } = window;
        const { top } = this.container.getBoundingClientRect();
        if (top < innerHeight) {
            this.constructImage();
            window.removeEventListener('scroll', this.detectScrolled);
        }
    }

    constructImage() {
        this.image.src = this.state.fullSizeSrc;
        this.image.onload = () => {
            this.setState({ hasLoaded: true });
        }
    }

    render() {
        return (
            <Container 
                isFullWidth={this.state.isFullWidth}
                maxWidth={this.state.maxWidth} 
                innerRef={el => this.container = el}
            >
                <RatioHolder ratio={`${this.state.ratio}%`}/>
                <Thumbnail 
                    src={this.state.thumbnailSrc} 
                    innerRef={el => this.thumbnail = el}
                    hasLoaded={this.state.hasLoaded}
                />
                <Image 
                    innerRef={el => this.image = el} 
                    hasLoaded={this.state.hasLoaded} 
                />
            </Container>
        );
    }
}

export default ImageBlock;