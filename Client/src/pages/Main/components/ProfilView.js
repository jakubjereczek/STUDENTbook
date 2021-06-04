import React from 'react'
import { ContainerInside, UserIcon, Text } from '../../../components/SharedStyles.css'
import { UserAbout, MyContainer } from './ProfilView.css'
import { useAuth } from '../../../services/AuthorizationService';

function NotFound() {

    const userStatus = useAuth();
    const user = userStatus.user;
    const { firstName, lastName, University } = user;

    return (
        <ContainerInside>
            <MyContainer>
                {/* <UserIcon /> */}
                <UserAbout>
                    <Text>Witaj, {firstName} {lastName} </Text>
                    <Text>{University.name}, {University.city}</Text>
                </UserAbout>
            </MyContainer>

        </ContainerInside >
    )
}

export default NotFound;