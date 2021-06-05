import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import { AuthorizationTemplete } from '../../components';
import { Subtitle, Input, Button, Select, Label } from '../../components/SharedStyles.css'
import { getAllUniversities } from '../../services/UniversityService'
import { postUser } from '../../services/UserService'

import { useAuth } from '../../services/AuthorizationService';
import { useChangerTheme } from '../../services/ThemeContext';

import toast from 'react-hot-toast';
import User from '../../models/User'


function Signup() {

    const nickInput = useRef(null);
    const firstNameInput = useRef(null);
    const lastNameInput = useRef(null);
    const passwordInput = useRef(null);
    const emailInput = useRef(null);
    const [universityId, setUniversityId] = useState(0);

    const userStatus = useAuth();
    const changerTheme = useChangerTheme();
    const { isLight } = changerTheme;


    const signupAction = (event) => {
        event.preventDefault();
        const user = new User(universityId, nickInput.current.value, firstNameInput.current.value, lastNameInput.current.value, new Date(), passwordInput.current.value, emailInput.current.value);
        const userObj = user.getObject()
        console.log(userObj)
        postUser(userObj)
            .then(() => {
                toast.success("Konto zostało utworzone.")
                userStatus.login(nickInput.current.value, passwordInput.current.value);
            })
            .catch((err) => {
                toast.error("Wystąpił bląd podczas dodawania konta użytkownika. Dane sa nieprawidłowe bądz login/email juz istnieje.")
            })

    }

    const promiseOptions = () => {
        return getAllUniversities()
            .then((response) => {
                console.log(response.data)
                return response.data;
            }).catch(() => {
                toast.error("Wystapił bląd podczas ładowania listy uniwersytetów!")
            })
    }

    const onChangeSelect = (item) => {
        console.log(item.universityId)
        setUniversityId(item.universityId);
    };

    const content = (
        <React.Fragment>
            <Label htmlFor="nick"> nick: </Label>
            <Input type="text" id="nick" ref={nickInput} />

            <Label htmlFor="firstName"> imię: </Label>
            <Input type="text" id="firstName" ref={firstNameInput} />

            <Label htmlFor="lastName"> imię: </Label>
            <Input type="text" id="lastName" ref={lastNameInput} />

            <Label htmlFor="password"> haslo: </Label>
            <Input type="password" id="password" ref={passwordInput} />

            <Label htmlFor="password"> email: </Label>
            <Input type="email" id="email" ref={emailInput} />

            <Label htmlFor="university"> uczelnia: </Label>
            <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions}
                getOptionValue={(option) => option.universityId}
                getOptionLabel={(option) => option.name}
                onChange={onChangeSelect}
            />

            <Button onClick={signupAction}>Zarejestruj się</Button>

        </React.Fragment>
    )

    const link = (
        <Subtitle>Posiadasz już konto? <Link to='/login'>Zaloguj się</Link>.</Subtitle>
    )


    return (
        <AuthorizationTemplete content={content} link={link}></AuthorizationTemplete>
    )
}

export default Signup;

