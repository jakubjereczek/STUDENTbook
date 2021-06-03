import React from 'react'
import { ContainerInside, Subtitle } from '../../../components/SharedStyles.css';
import { FixedContainer } from './Hover.css'

function Hover({ active, user, style }) {

    const { firstName, lastName, lastLogin, Posts, University, createdAt, nick } = user;

    console.log(user)

    return active && (
        <FixedContainer style={style}>
            <ContainerInside>
                <Subtitle>Użytkownik: <span>{firstName} {lastName}</span></Subtitle>
                <Subtitle>Pseudonim: <span>{nick}</span></Subtitle>
                <Subtitle>Posty użytkownika: <span>{Posts.length}</span></Subtitle>
                <Subtitle>Uczelnia użytkownika: <span>{University.name}</span></Subtitle>
                <Subtitle>Konto aktywne od: <span>{new Date(createdAt).toLocaleString()}</span></Subtitle>

            </ContainerInside >
        </FixedContainer>

    )
}

export default Hover;