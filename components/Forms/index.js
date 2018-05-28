import styled from 'styled-components';
import * as styleConstants from '../styleConstants';

export const FormContainer = styled.div`
    box-shadow: 1px 1px 4px 2px ${styleConstants.colorShadow};
    padding: 16px;
    width: 100%;
`;

export const FormTitle = styled.h1`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 32px;
    margin-top: 8px;
    color: ${styleConstants.colorBodyText};
`;

export const FormDescription = styled.p`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 20px;
    color: ${styleConstants.colorBodyText};
`;

export const Fieldset = styled.fieldset`
    margin-bottom: 16px;
    padding: 0;
    border: none;
    padding-top: 8px;
    padding-bottom: 8px;
`;

export const Legend = styled.legend`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 400;
    font-size: 20px;
    color: ${styleConstants.colorBodyText};
`;

export const Label = styled.label`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    font-size: 16px;
    color: ${styleConstants.colorBodyText};
    display: block;
    margin-top: 16px;
    margin-bottom: 8px;
`;

export const Input = styled.input`
    background-color: ${styleConstants.colorInputBackground};
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
    padding: 8px 16px;
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    display: block;
    width: 100%;
`;

export const FileInput = styled.input`
    background-color: ${styleConstants.colorInputBackground};
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
    padding: 8px 16px;
    font-family: ${styleConstants.fontSecondary};
    font-size: 16px;
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    display: block;
    width: 100%;
`;

export const Textarea = styled.textarea`
    width: 100%;
    height: 120px;
    font-family: ${styleConstants.fontSecondary};
    color: ${styleConstants.colorBodyText};        
    padding: 8px;
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
`;

export const Anchor = styled.a`
    font-family: ${styleConstants.fontSecondary};
    color: ${styleConstants.colorBodyText};
    font-weight: 400;
    font-size: 16px;
    text-decoration: none;
    display: block;
    margin-top: 16px;
    &:hover {
        color: ${styleConstants.colorPrimary};
        text-decoration: underline;
    } 
`;

export const Select = styled.select`
    font-family: ${styleConstants.fontSecondary};
    font-weight: 300;
    color: ${styleConstants.colorBodyText};
    background-color: ${styleConstants.colorInputBackground};
    border: solid 2px ${styleConstants.colorInputBorder};
    border-radius: 3px;
    width: 100%;
    padding: 8px 16px;
`;

export const Option = styled.option`
    font-weight: 300;
`;