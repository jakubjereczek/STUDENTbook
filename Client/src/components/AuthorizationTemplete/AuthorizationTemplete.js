import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, Input, Button, Subtitle } from '../SharedStyles.css'
import { Container, FormContainer, Form, } from './AuthorizationTemplete.css'

function AuthorizationTemplete({ content, link }) {

    return (
        <React.Fragment>
            <Container>
                <FormContainer>
                    <Logo>student<span>book</span></Logo>
                    <Form>
                        {content}
                    </Form>
                </FormContainer>
                {link}
            </Container>
        </React.Fragment>
    )
}

export default AuthorizationTemplete;