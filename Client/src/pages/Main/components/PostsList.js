import React, { useState, useEffect, useRef, useCallback } from 'react'
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
    const [visiblePosts, setVisiblePosts] = useState([]);

    const [hoverActive, setHoverActive] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const [hoverUser, setHoverUser] = useState(null);
    const [hoverCords, setHoverCords] = useState({
        top: 0,
        left: 0
    })

    const [loading, setLoading] = useState(true);

    // pagination
    // TODO: Pagination in Server side. 
    // I should to get posts (example ten for page) with every scroll, not everythings.
    const [hasMore, setHasMore] = useState(false);
    const [currentSite, setCurrentSite] = useState(1);
    const renderCount = 10;

    useEffect(async () => {
        if (!popupActive) {  // Startowo jest false - czyli wykona się na starcie + przy wyjściu z edycji, edytowaniu.
            const posts = await getAllPosts();
            setPosts(posts.data);
            const visiblePosts = posts.data.slice(0, currentSite * renderCount);
            setVisiblePosts(visiblePosts);
            setLoading(false);
        }
    }, [popupActive]) // W przypadku gdy zmienimy wartość popupu. 


    const onMouseEnter = (event, user) => {
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
        const postsUpdated = posts.filter(p => p !== post);
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

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        console.log(!loading && node);
        if (loading)
            return false;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log('visible');
                setHasMore(visiblePosts < posts);
                if (hasMore) {
                    setCurrentSite(currentSite + 1);
                    const visiblePosts = posts.slice(0, currentSite * renderCount);
                    setVisiblePosts(visiblePosts);
                }
            }
        });
        if (node) observer.current.observe(node);

    })

    const postsList = visiblePosts.map((post, index) => {
        const user = post.Users;
        const university = post.Users.University;

        return (
            <React.Fragment>
                <ContainerInside key={post.postId} ref={visiblePosts.length === index + 1 ? lastPostElementRef : null}>
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
                                        <FaRegTimesCircle />
                                    </ButtonIcon>
                                    <ButtonIcon onClick={() => editPostAction(post)}>
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