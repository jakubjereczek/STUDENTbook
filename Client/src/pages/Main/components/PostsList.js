import React, { useState, useEffect, useMemo } from 'react'
import { ContainerInside, UserIcon } from '../../../components/SharedStyles.css'
import { AboutUser, Author } from './PostsList.css'

import { getAllPosts } from '../../../services/PostService'
import { getUserById } from '../../../services/UserService'

function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const posts = await getAllPosts();
        setPosts(posts.data);
    }, [])

    const postsList = posts.map((post) => {
        const user = post.Users;
        const university = post.Users.University;

        console.log(post);
        return (
            <ContainerInside key={post.postId}>
                <AboutUser>
                    <UserIcon />
                    <Author>{user.firstName} {user.lastName}, {university.name}: </Author>
                </AboutUser>{post.content}
            </ContainerInside >
        )
    });

    return (
        <React.Fragment>
            {postsList}
        </React.Fragment>
    )
}

export default PostsList;