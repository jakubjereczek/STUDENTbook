import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

import { Subtitle, Input, Button, Label } from '../../components/SharedStyles.css'

import { useAuth } from '../../services/AuthorizationService';
import { Redirect } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthorizationTemplete } from '../../components';

function Login() {

    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const userStatus = useAuth();

    const loginAction = async (event) => {
        event.preventDefault();
        userStatus.login(loginInput.current.value, passwordInput.current.value)
            .then(() => {
                <Redirect push to="/" />
                toast.success('Zalogowano poprawnie.')
            }).catch(() => {
                toast.error('Wystąpił problem podczas logowania!')
            })
    }

    const content = (
        <React.Fragment>
            <Label htmlFor="login"> login: </Label>
            <Input type="text" id="login" ref={loginInput} />
            <Label htmlFor="password"> hasło: </Label>
            <Input type="password" id="password" ref={passwordInput} />
            <Button onClick={loginAction}>Zaloguj się</Button>
        </React.Fragment>
    )
    const link = (
        <Subtitle>Nie posiadasz konta? <Link to='/signup'>Zarejestruj się</Link>.</Subtitle>
    )

    return (
        <AuthorizationTemplete content={content} link={link}></AuthorizationTemplete>
    )
}

export default Login;
