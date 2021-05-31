import React, { useContext, useEffect, useState } from 'react';

import { getUserByName } from './UserService';

const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    // Logowanie zmienia tylko localStorage, ktory potem przy kazdym requescie jest wysylany do przeglądarki i w przypadku 
    const login = (name, password) => {

        // 1. Ustawiam w localStorage w formiecie base64 login:haslo użytkownika.
        const token = Buffer.from(`${name}:${password}`, 'utf8').toString('base64');
        localStorage.setItem('token', token);
        setUser(name);

        // 2. Pobieram z bazy z autoryzowanej metody - dzięki temu wiem, że uzytkownik podał poprawne dane. 
        // Authorization Header wysyła się przy kazdym requeascie.
        getUserByName(name)
            .then(response => {
                // 3. Dane użytkownika ładuje do user.
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            }).catch((err) => {
                console.log('Blad: ' + err);
                if (user != null) {
                    setUser(null);
                    localStorage.setItem('user', null)
                }
            })
    }

    const logout = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        setUser(null);
    }

    const isUserAuthorizated = () => {
        console.log(user)

        if (user == null) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        const userLocalStorageString = localStorage.getItem("user");
        const userObject = JSON.parse(userLocalStorageString);
        if (userObject != null)
            setUser(userObject);
        console.log(user)
        setLoading(false);
    }, [])

    const values = {
        login,
        logout,
        isUserAuthorizated
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )

}