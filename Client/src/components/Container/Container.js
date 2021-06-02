import React from 'react'
import { ContainerWrapper, Menu, MenuInside, Content, ContainerInside } from './Container.css'
import { Logo } from '../SharedStyles.css'
import { FaPowerOff } from "react-icons/fa";

import { useAuth } from '../../services/AuthorizationService';

function Container({ children }) {

    const userStatus = useAuth();
    const isUserAuthorizated = userStatus.isUserAuthorizated();

    const logoutAction = () => userStatus.logout();

    return (
        <ContainerWrapper>
            <Menu>
                <MenuInside>
                    <Logo>student<span>book</span></Logo>
                    <span>
                        {isUserAuthorizated && <FaPowerOff onClick={logoutAction} />}
                    </span>
                </MenuInside >
            </Menu>
            <Content>
                <ContainerInside>
                    {children}
                </ContainerInside>
            </Content>
        </ContainerWrapper>
    )

}

export default Container;