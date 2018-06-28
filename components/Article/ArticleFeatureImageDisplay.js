import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { debounce } from 'lodash';

const Container = styled.figure`
    width: 100%;
    position: relative;
    border: solid #eee 2px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    max-width: ${props => `${props.maxWidth}px`};
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

class ArticleFeatureImageDisplay extends Component {

    static propTypes = {
        articles: PropTypes.object.isRequired,
        article_id: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.detectScrolled = this.detectScrolled.bind(this);
        this.constructImage = this.constructImage.bind(this);
        this.debouncedDetectScrolled = debounce(this.detectScrolled, 100, { leading: true, trailing: false });
        const article = this.props.articles[this.props.article_id];
        const articleImage = article.image;
        this.state = {
            hasLoaded: false,
            fullSizeSrc: articleImage.original.imageUrl,
            thumbnailSrc: articleImage.thumbnail.imageUrl,
            maxWidth: articleImage.original.size.width,
            ratio: articleImage.original.size.height / articleImage.original.size.width * 100
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
        )
    }
}

const mapStateToProps = state => ({
    articles: state.posts.models
});

export default connect(mapStateToProps)(ArticleFeatureImageDisplay);
