import React, { Component } from 'react';
import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

// export const ButtonElement = styled.button`
//     font-family: ${styleConstants.fontSecondary};
//     font-weight: 400;
//     font-size: 14px;
//     background-color: ${styleConstants.colorSecondary};
//     color: ${styleConstants.colorPrimary};
//     border: solid 2px ${styleConstants.colorPrimary};
//     border-radius: 3px;
//     padding: 4px 16px;
//     text-decoration: none;
//     transition: all ease 0.25s;
//     cursor: pointer;
//     &:hover {
//         color: ${styleConstants.colorSecondary};
//         background-color:  ${styleConstants.colorPrimary};
//         border-color:  ${styleConstants.colorPrimary};
//     }
// `;

export const ButtonElement = styled.button`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 14px;
    background-color: ${props => props.isHovered ?
        styleConstants.colorPrimary :
        styleConstants.colorSecondary
    };
    color: ${props => props.isHovered ?
        styleConstants.colorSecondary :
        styleConstants.colorPrimary
    };
    border: solid 2px ${styleConstants.colorPrimary};
    border-radius: 3px;
    padding: 4px 16px;
    text-decoration: none;
    transition: all ease 0.25s;
    cursor: pointer;
`;

const AnchorButtonElement = ButtonElement.withComponent('a');

export class Button extends Component {
    constructor(props) {
        super(props);
        this._handleMouseEnter = this._handleMouseEnter.bind(this);
        this._handleMouseLeave = this._handleMouseLeave.bind(this);
        this.state = {
            isHovered: false
        };
    }

    _handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    _handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    render() {
        return (
            <ButtonElement 
                {...this.props}
                isHovered={this.state.isHovered}
                onMouseEnter={this._handleMouseEnter}
                onMouseLeave={this._handleMouseLeave}
            >{this.props.children}</ButtonElement>
        );
    }
}

export class AnchorButton extends Component {
    constructor(props) {
        super(props);
        this._handleMouseEnter = this._handleMouseEnter.bind(this);
        this._handleMouseLeave = this._handleMouseLeave.bind(this);
        this.state = {
            isHovered: false
        };
    }

    _handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    _handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    render() {
        return (
            <AnchorButtonElement 
                {...this.props}
                isHovered={this.state.isHovered}
                onMouseEnter={this._handleMouseEnter}
                onMouseLeave={this._handleMouseLeave}
            >{this.props.children}</AnchorButtonElement>
        );
    }
}
