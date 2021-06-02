import React from 'react'
import { ContainerInside, UserIcon } from '../../../components/SharedStyles.css'
import { UserAbout, MyContainer } from './ProfilView.css'
import { useAuth } from '../../../services/AuthorizationService';

function NotFound() {

    const userStatus = useAuth();
    const user = userStatus.user;
    const { firstName, lastName, University } = user;

    return (
        <ContainerInside>
            <MyContainer>
                <UserIcon />
                <UserAbout>
                    <p>Witaj, {firstName} {lastName} </p>
                    <p>{University.name}, {University.city}</p>
                </UserAbout>
            </MyContainer>

        </ContainerInside >
    )
}

export default NotFound;