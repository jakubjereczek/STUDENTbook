import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { get, set } from './ionicStorage';

import { getUserByName } from './UserService';
import User from '../models/user';

interface IProps {
    login: (name: string, password: string) => any,
    logout: () => any,
    isUserAuthorizated: () => boolean,
    user: User | null,
}

const defaultProps = {
    login: () => { },
    logout: () => { },
    isUserAuthorizated: () => false,
    user: null,
}

const AuthContext = React.createContext<IProps>(defaultProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props: any) => {

    const [user, setUser] = useState(null);

    const login = async (name: string, password: string) => {

        const token = Buffer.from(`${name}:${password}`, 'utf8').toString('base64');
        await set('token', token);

        return new Promise((resolve, reject) => {
            getUserByName(name)
                .then(async (response: Response | any) => {

                    const userString = JSON.stringify(response.data);
                    await set('user', userString);

                    return response;
                }).then((response: Response | any) => {
                    setUser(response.data);
                    resolve(response.data)
                }).catch(async (error: Error) => {
                    console.log('Blad: ' + error);
                    if (user != null) {
                        setUser(null);
                        await set('token', null);
                    }
                    reject(new Error("Error authorization"))
                })
        })

    }

    const logout = async () => {
        await set('token', null);
        await set('user', null);
        setUser(null);
    }

    const isUserAuthorizated = () => {
        console.log(user)

        if (user == null || user == "") {
            return false;
        }
        return true;
    }

    useEffect(() => {
        async function init() {
            const user = await get('user');
            const userObject = JSON.parse(user);
            if (userObject != null)
                setUser(userObject);
            console.log(user)
        }
        init();
    }, [])

    const values = {
        login,
        logout,
        isUserAuthorizated,
        user,
    }

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    )

}