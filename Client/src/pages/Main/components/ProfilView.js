import React from 'react'
import { ContainerInside, UserIcon, Text } from '../../../components/SharedStyles.css'
import { UserAbout, MyContainer } from './ProfilView.css'

function ProfilView({ currentUser }) {

    const {
        firstName,
        lastName,
        // University 
    } = currentUser;

    return (
        <ContainerInside>
            <MyContainer>
                <UserIcon />
                <UserAbout>
                    <Text>Witaj, {firstName} {lastName} </Text>
                    {/* <Text>{University.name}, {University.city}</Text> */}
                </UserAbout>
            </MyContainer>

        </ContainerInside >
    )
}

export default ProfilView;