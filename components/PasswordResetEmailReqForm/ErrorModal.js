import styled from 'styled-components';
import * as styleConstants from '../styleConstants';
import { Button } from '../Button';

const PageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(17,17,17,0.8);
    z-index: 1000;
`;

const ErrorModalWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    padding: 16px;
`;

const ErrorModalContainer = styled.div`
    background-color: ${styleConstants.colorWarning};
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

const ModalButton = Button.extend`
    color: ${styleConstants.colorWarning};
    background-color: ${styleConstants.colorSecondary};
    border-color: ${styleConstants.colorSecondary};
    &:hover {
        color: ${styleConstants.colorWarning};
        background-color: ${styleConstants.colorSecondaryAlt};
        border-color: ${styleConstants.colorSecondaryAlt};
    }
`;

const ErrorModal = props => (
    <PageOverlay>
        <ErrorModalWrapper>
            <ErrorModalContainer>
                <ModalTitle>Email address not found</ModalTitle>
                <ModalText>There doesn't appear to be an account associated with the email address you have provided.</ModalText>
                <ModalButton onClick={props.closeModal}>Close</ModalButton>
            </ErrorModalContainer>
        </ErrorModalWrapper>
    </PageOverlay>
);

export default ErrorModal;
