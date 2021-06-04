import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { ContainerInside, UserIcon, Author, ButtonIcon } from '../../../components/SharedStyles.css'
import { AboutUser, DateString, PostContent, PostButtons } from './PostsList.css'

import { FaRegTimesCircle } from "react-icons/fa";

import { useAuth } from '../../../services/AuthorizationService';

import { deletePost, getAllPosts } from '../../../services/PostService'
import { getUserById } from '../../../services/UserService'

import AddPost from '../components/AddPost'

import Hover from './Hover';

import toast from 'react-hot-toast';

function PostsList() {
    const [posts, setPosts] = useState([]);

    const userStatus = useAuth();
    const currentUser = userStatus.user;

    const [hoverActive, setHoverActive] = useState(false);
    const [hoverUser, setHoverUser] = useState(null);
    const [hoverCords, setHoverCords] = useState({
        top: 0,
        left: 0
    })

    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const posts = await getAllPosts();
        setPosts(posts.data);
        setLoading(false);
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

    const deletePostAction = (post) => {
        const postsUpdated = posts.filter(p => p != post);
        setPosts(postsUpdated)
        deletePost(post.postId)
            .then(() => {
                toast.success('Post został usunięty.')
            }).catch(() => {
                toast.error('Wystąpił błąd podczas usuwania posta.')
            })
    }

    const postsList = posts.map((post) => {
        const user = post.Users;
        const university = post.Users.University;

        return (
            <React.Fragment>
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
                        <PostButtons>
                            {post.userId === currentUser.userId && (<ButtonIcon onClick={() => deletePostAction(post)}>
                                {/* Delete */}
                                <FaRegTimesCircle />
                            </ButtonIcon>)}
                        </PostButtons>
                    </PostContent>
                </ContainerInside >
            </React.Fragment>

        )
    });

    return (
        <React.Fragment>
            <AddPost setLoading={setLoading} setPosts={setPosts} posts={posts} />

            {postsList}
            {hoverActive && <Hover active={hoverActive} user={hoverUser} style={hoverCords} />}
        </React.Fragment>
    )
}

export default PostsList;