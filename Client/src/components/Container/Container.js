import React from 'react'
import { useHistory, Link } from "react-router-dom";

import { ContainerWrapper, Menu, MenuInside, Content, ContainerInside } from './Container.css'
import { Logo, ButtonIcon } from '../SharedStyles.css'
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
                    <Link to="/"><Logo>student<span>book</span></Logo></Link>
                    <span>
                        {isUserAuthorizated && <ButtonIcon><FaUserAlt onClick={moveToProfile} /></ButtonIcon>}
                        {isUserAuthorizated && <ButtonIcon><FaPowerOff onClick={logoutAction} /></ButtonIcon>}
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