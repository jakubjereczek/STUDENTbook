import React, { useRef } from 'react'
import { Title, Subtitle } from '../../components/SharedStyles.css'
import { Container, FormContainer, Form } from './Login.css';
import { Input, Button } from '../../components/SharedStyles.css'
import { Logo } from '../../components/SharedStyles.css'
import { useAuth } from '../../services/AuthorizationService';
import { useHistory, useLocation, Redirect } from "react-router-dom";

function Login() {

    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const userStatus = useAuth();

    const history = useHistory();

    const loginAction = (event) => {
        event.preventDefault();
        // TODO: Obsługa try/catch, komunikaty itd.
        try {
            userStatus.login(loginInput.current.value, passwordInput.current.value);
            console.log("CZY KOD NIZEJ JUZ SIE NIE WYKONA?");
            <Redirect push to="/" />
        } catch {
            //history.goBack()
        }

    }

    return (
        <React.Fragment>
            <Container>
                <FormContainer>
                    <Form>
                        <Logo>student<span>book</span></Logo>
                        <label htmlFor="login"> login: </label>
                        <Input type="text" id="login" ref={loginInput} />
                        <label htmlFor="password"> hasło: </label>
                        <Input type="password" id="password" ref={passwordInput} />
                        <Button onClick={loginAction}>Zaloguj się</Button>
                    </Form>
                </FormContainer>
                <Subtitle>Nie posiadasz konta? <span>Zarejestruj się</span>.</Subtitle>
            </Container>
        </React.Fragment>
    )
}

export default Login;
