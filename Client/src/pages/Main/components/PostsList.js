import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { ContainerInside, UserIcon, Author, ButtonIcon, Text } from '../../../components/SharedStyles.css'
import { AboutUser, DateString, PostContent, PostButtons } from './PostsList.css'

import { FaRegTimesCircle, FaRegEdit } from "react-icons/fa";

import { deletePost, getAllPosts } from '../../../services/PostService'
import { getUserById } from '../../../services/UserService'

import AddPost from '../components/AddPost'

import Hover from './Hover';

import toast from 'react-hot-toast';
import EditPostPopup from './EditPostPopup';

function PostsList({ currentUser }) {
    const [posts, setPosts] = useState([]);


    const [hoverActive, setHoverActive] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const [hoverUser, setHoverUser] = useState(null);
    const [hoverCords, setHoverCords] = useState({
        top: 0,
        left: 0
    })

    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (!popupActive) {  // Startowo jest false - czyli wykona się na starcie + przy wyjściu z edycji, edytowaniu.
            const posts = await getAllPosts();
            setPosts(posts.data);
            setLoading(false);
        }
    }, [popupActive]) // W przypadku gdy zmienimy wartość popupu. 


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

    const editPostAction = (post) => {
        setPopupActive(true)
        setActivePost(post);
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
                        <Text>{post.content}</Text>
                        <PostButtons>
                            {post.userId === currentUser.userId && (
                                <React.Fragment>
                                    <ButtonIcon onClick={() => deletePostAction(post)}>
                                        {/* Edit */}
                                        <FaRegTimesCircle />
                                    </ButtonIcon>
                                    <ButtonIcon onClick={() => editPostAction(post)}>
                                        {/* Delete */}
                                        <FaRegEdit />
                                    </ButtonIcon>
                                </React.Fragment>)
                            }
                        </PostButtons>
                    </PostContent>
                </ContainerInside >
            </React.Fragment>

        )
    });

    return (
        <React.Fragment>
            <AddPost setLoading={setLoading} setPosts={setPosts} posts={posts} />
            <EditPostPopup active={popupActive} setActive={setPopupActive} post={activePost} />

            {postsList}
            {hoverActive && <Hover active={hoverActive} user={hoverUser} style={hoverCords} />}
        </React.Fragment>
    )
}

export default PostsList;