import React from 'react'
import PostsList from './components/PostsList'
import ProfilView from './components/ProfilView'

import { useAuth } from '../../services/AuthorizationService';


function Main() {

    // TODO: Praca na jednym Contexcie User.
    const userStatus = useAuth();
    const currentUser = userStatus.user;

    return (
        <React.Fragment>
            <ProfilView currentUser={currentUser} />
            <PostsList currentUser={currentUser} />
        </React.Fragment>
    )
}

export default Main;