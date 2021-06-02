import React from 'react'
import { useHistory } from "react-router-dom";

import { ContainerWrapper, Menu, MenuInside, Content, ContainerInside, Button } from './Container.css'
import { Logo } from '../SharedStyles.css'
import { FaUserAlt, FaPowerOff } from "react-icons/fa";

import { useAuth } from '../../services/AuthorizationService';

function Container({ children }) {

    const userStatus = useAuth();
    const isUserAuthorizated = userStatus.isUserAuthorizated();

    const history = useHistory();

    const logoutAction = () => userStatus.logout();
    const moveToProfile = () => history.push('/profile');


    return (
        <ContainerWrapper>
            <Menu>
                <MenuInside>
                    <Logo>student<span>book</span></Logo>
                    <span>
                        {isUserAuthorizated && <Button><FaUserAlt onClick={moveToProfile} /></Button>}
                        {isUserAuthorizated && <Button><FaPowerOff onClick={logoutAction} /></Button>}
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