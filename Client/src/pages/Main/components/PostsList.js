import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { ContainerInside, UserIcon } from '../../../components/SharedStyles.css'
import { AboutUser, Author, DateString, PostContent } from './PostsList.css'

import { getAllPosts } from '../../../services/PostService'
import { getUserById } from '../../../services/UserService'
import Hover from './Hover';

function PostsList() {
    const [posts, setPosts] = useState([]);

    const [hoverActive, setHoverActive] = useState(false);
    const [hoverUser, setHoverUser] = useState(null);
    const [hoverCords, setHoverCords] = useState({
        top: 0,
        left: 0
    })

    useEffect(async () => {
        const posts = await getAllPosts();
        setPosts(posts.data);
    }, [])

    const onMouseEnter = (event, user) => {
        console.log(event)
        setHoverCords({
            top: event.clientY + 10,
            left: event.clientX
        })
        setHoverUser(user)
        setHoverActive(true)
    }
    const onMouseLeave = (event) => {
        setHoverUser(null)
        setHoverActive(false)
    }

    const postsList = posts.map((post) => {
        const user = post.Users;
        const university = post.Users.University;

        return (
            <ContainerInside key={post.postId}>
                <AboutUser>
                    <UserIcon />
                    <p>
                        <Link to={`/profile/${post.userId}`}>
                            <Author onMouseEnter={(event) => onMouseEnter(event, user)} onMouseLeave={onMouseLeave}>{user.firstName} {user.lastName}</Author></Link>
                        <DateString>{new Date(post.createdAt).toLocaleString()}</DateString>
                    </p>

                </AboutUser>
                <PostContent>
                    {post.content}
                </PostContent>
            </ContainerInside >
        )
    });

    return (
        <React.Fragment>
            {postsList}
            {hoverActive && <Hover active={hoverActive} user={hoverUser} style={hoverCords} />}
        </React.Fragment>
    )
}

export default PostsList;