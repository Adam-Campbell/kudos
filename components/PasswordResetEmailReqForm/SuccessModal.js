import PropTypes from 'prop-types';
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

const ModalButton = Button.extend`
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
                <ModalTitle>Email sent!</ModalTitle>
                <ModalText>An email has been sent to the email address you provided. Follow the link inside to reset your password.</ModalText>
                <ModalButton onClick={props.closeModal}>Close</ModalButton>
            </SuccessModalContainer>
        </SuccessModalWrapper>
    </PageOverlay>
);

SuccessModal.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default SuccessModal;
