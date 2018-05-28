import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import Link from 'next/link';
import { AnchorButton } from '../Button';

const PageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(17,17,17,0.8);
    z-index: 1000;
`;

const SuccessModalWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    padding: 16px;
`;

const SuccessModalContainer = styled.div`
    background-color: ${styleConstants.colorSuccess};
    padding: 16px;
    border-radius: 3px;
    width: 100%;
`;

const ModalTitle = styled.h2`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 24px;
    color: ${styleConstants.colorSecondary};
    margin-top: 8px;
`;

const ModalText = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 16px;
    color: ${styleConstants.colorSecondary};
`;

const ModalButton = AnchorButton.extend`
    color: ${styleConstants.colorSuccess};
    background-color: ${styleConstants.colorSecondary};
    border-color: ${styleConstants.colorSecondary};
    &:hover {
        color: ${styleConstants.colorSuccess};
        background-color: ${styleConstants.colorSecondaryAlt};
        border-color: ${styleConstants.colorSecondaryAlt};
    }
`;


const SuccessModal = props => (
    <PageOverlay>
        <SuccessModalWrapper>
            <SuccessModalContainer>
                <ModalTitle>Password updated!</ModalTitle>
                <ModalText>Your password has been successfully updated, click okay to continue.</ModalText>
                <ModalButton onClick={props.handleRedirect}>Okay</ModalButton>
            </SuccessModalContainer>
        </SuccessModalWrapper>
    </PageOverlay>
);

export default SuccessModal;
