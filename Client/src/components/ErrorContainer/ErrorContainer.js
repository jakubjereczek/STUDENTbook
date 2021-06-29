import React from 'react';

import { Text, ErrorMessageContainer, ButtonIcon } from '../SharedStyles.css'
import { FaPlug } from "react-icons/fa";

const ErrorContainer = ({ error, callback }) => {

    return (
        <ErrorMessageContainer>
            <div>
                <ButtonIcon><FaPlug onClick={callback} style={{ 'fontSize': '32px' }} /></ButtonIcon>
                <Text>(naciśnij, aby spróbować ponownie)</Text>
                <Text>{error}</Text>
            </div>
        </ErrorMessageContainer>
    )
}

export default ErrorContainer;