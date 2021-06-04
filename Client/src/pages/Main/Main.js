import React from 'react'
import PostsList from './components/PostsList'
import ProfilView from './components/ProfilView'

function Main() {

    // TODO: Praca na jednym Contexcie User.

    return (
        <React.Fragment>
            <ProfilView />
            <PostsList />
        </React.Fragment>
    )
}

export default Main;