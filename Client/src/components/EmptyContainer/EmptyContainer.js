import React from 'react'
import { ContainerWrapper, Content } from './EmptyContainer.css'

function EmptyContainer({ children }) {

    return (
        <ContainerWrapper>
            <Content>
                {children}
            </Content>
        </ContainerWrapper>
    )

}

export default EmptyContainer;