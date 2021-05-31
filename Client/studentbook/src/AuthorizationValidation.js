import React, { useRef } from 'react';
import { useAuth } from './services/AuthorizationService';
import { getAllUsers, getUserById } from './services/UserService';


function AuthorizationValidation({ isUserAuthorizated }) {

    const userStatus = useAuth();
    //const isUserAuthorizated = userStatus.isUserAuthorizated();

    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    const login = (event) => {
        event.preventDefault();
        userStatus.login(loginInput.current.value, passwordInput.current.value)
    }

    const logout = (event) => {
        event.preventDefault();
        userStatus.logout();
    }

    const getAllUsersAPI = () => {
        getAllUsers();
    }

    const getUserByIdAPI = () => {
        getUserById(19);
    }

    return (
        <React.Fragment>
            {isUserAuthorizated ? (
                <div>
                    <button onClick={logout}>wyloguj</button>
                </div>
            ) : (
                    <div>
                        <h2>Zaloguj się</h2>
                        <form>
                            <input type="text" ref={loginInput} />
                            <input type="password" ref={passwordInput} />
                            <button onClick={login}>Zaloguj</button>
                        </form>
                    </div>
                )}
            <div>
                User Status (teoretycznie): {isUserAuthorizated ? "Zalogowany" : "Niezalogowany"}
            </div>
            <button onClick={getAllUsersAPI}>getAllUsersAPI</button>
            <button onClick={getUserByIdAPI}>getUserByIdAPI(19) AUTORYZACJA</button>
        </React.Fragment>

    )

}
export default AuthorizationValidation;