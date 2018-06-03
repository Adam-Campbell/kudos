import React, { Component } from 'react';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';

const CategoryNavOuter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const CategoryNav = styled.nav`
    width: calc(100% - 48px);
    overflow-x: hidden;
`;

const IconContainer = styled.span`
    color: ${props => props.isDisabled ? styleConstants.colorShadow : styleConstants.colorPrimary};
    font-size: 2rem;
    cursor: pointer;
    & svg {
        width: 16px;
    }
`;

const CategoryNavList = styled.ul`
    display: flex;
    padding-left: 0;
    transition: transform ease 0.25s;
    margin: 0;
    transform: ${props => `translateX(${props.offset}px)`};
`;

const CategoryNavListItem = styled.li`
    display: inline-block;
    flex-shrink: 0;
`;

const CategoryNavAnchor = styled.a`
    display: block;
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    padding: 16px;
    color: ${styleConstants.colorPrimary};
    text-decoration: none;
    transition: color ease 0.25s;
    &:hover {
        color:  ${styleConstants.colorPrimaryAlt};
    }
`;

class CategoryNavContainer extends Component {
    constructor(props) {
        super(props);
        this.scrollForward = this.scrollForward.bind(this);
        this.scrollBackward = this.scrollBackward.bind(this);
        this.lastItem = React.createRef();
        this.nav = React.createRef();
        this.state = {
            offset: 0,
            atLeftBound: true,
            atRightBound: false
        }
    }

    scrollForward() {
        if (!this.state.atRightBound) {
            const oldOffset = this.state.offset;
            const navRect = this.nav.getBoundingClientRect();
            const navRightBound = navRect.left + navRect.width;
            const lastItemRect = this.lastItem.getBoundingClientRect();
            const lastItemRightBound = lastItemRect.left + lastItemRect.width;
            if (lastItemRightBound - 250 > navRightBound) {
                this.setState({ 
                    offset: oldOffset - 250,
                    atLeftBound: false,
                    atRightBound: false 
                });
            } else {
                const diff = lastItemRightBound - navRightBound;
                this.setState({ 
                    offset: oldOffset - diff,
                    atLeftBound: false,
                    atRightBound: true
                });
            } 
        }
    }

    scrollBackward() {
        if (!this.state.atLeftBound) {
            const oldOffset = this.state.offset;
            if (oldOffset + 250 < 0) {
                this.setState({
                    offset: oldOffset + 250,
                    atLeftBound: false,
                    atRightBound: false
                });
            } else {
                this.setState({
                    offset: 0,
                    atLeftBound: true,
                    atRightBound: false
                });
            }
        }
    }

    render() {
        return (
            <CategoryNavOuter>
                <IconContainer isDisabled={this.state.atLeftBound} onClick={this.scrollBackward}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </IconContainer>
                <CategoryNav  innerRef={el => this.nav = el}>
                    <CategoryNavList offset={this.state.offset}>
                        <CategoryNavListItem>
                            <Link passHref as="/category/javascript" href="/category?category=javascript">
                                <CategoryNavAnchor>JavaScript</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/fantasy" href="/category?category=fantasy">
                                <CategoryNavAnchor>Fantasy</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/games" href="/category?category=games">
                                <CategoryNavAnchor>Games</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/news" href="/category?category=news">
                                <CategoryNavAnchor>News</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/fashion" href="/category?category=fashion">
                                <CategoryNavAnchor>Fashion</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/travel" href="/category?category=travel">
                                <CategoryNavAnchor>Travel</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/motivation" href="/category?category=motivation">
                                <CategoryNavAnchor>Motivation</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/relationships" href="/category?category=relationships">
                                <CategoryNavAnchor>Relationships</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/design" href="/category?category=design">
                                <CategoryNavAnchor>Design</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/politics" href="/category?category=politics">
                                <CategoryNavAnchor>Politics</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem>
                            <Link passHref as="/category/mentalhealth" href="/category?category=mentalhealth">
                                <CategoryNavAnchor>Mental Health</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                        <CategoryNavListItem innerRef={el => this.lastItem = el}>
                            <Link passHref as="/category/music" href="/category?category=music">
                                <CategoryNavAnchor>Music</CategoryNavAnchor>
                            </Link>
                        </CategoryNavListItem>
                    </CategoryNavList>
                </CategoryNav>
                <IconContainer isDisabled={this.state.atRightBound} onClick={this.scrollForward}>
                    <FontAwesomeIcon icon={faAngleRight}/>
                </IconContainer>
            </CategoryNavOuter>
        )
    }
}

export default CategoryNavContainer;