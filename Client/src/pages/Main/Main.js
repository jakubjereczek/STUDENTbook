import React from 'react'
import AddPost from './components/AddPost'
import PostsList from './components/PostsList'
import ProfilView from './components/ProfilView'

function Main() {

    return (
        <React.Fragment>
            <ProfilView />
            <AddPost />

            <PostsList />
        </React.Fragment>
    )
}

export default Main;