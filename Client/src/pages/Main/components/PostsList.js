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

    const [hoverActive, setHoverActive] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const [hoverUser, setHoverUser] = useState(null);
    const [hoverCords, setHoverCords] = useState({
        top: 0,
        left: 0
    })

    const [loading, setLoading] = useState(true);
    const [loadingNewPage, setLoadingNewPage] = useState(false);

    // pagination
    // TODO: Pagination in Server side. 
    // I should to get posts (example ten for page) with every scroll, not everythings.
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(100);

    useEffect(() => {
        async function fetchData() {
            // TODO: Don't render the same every time. 
            const postsFetch = await getAllPosts(pageNumber, pageSize);

            console.log(postsFetch)
            if (postsFetch.data.hasNextPage === "Yes") {
                setHasMore(true);
            } else {
                setHasMore(false);
            }

            setPosts([
                ...posts,
                ...postsFetch.data.data
            ]);
            setLoading(false);
        }
        fetchData();
    }, [pageNumber]) // W przypadku gdy zmienimy wartość popupu. 


    const onMouseEnter = (event, user) => {
        setHoverCords({
            top: event.clientY + 10,
            left: event.clientX
        })
        setHoverUser(user)
        setHoverActive(true)
    }
    const onMouseLeave = () => {
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
        if (loading)
            return false;
        if (observer.current) {
            observer.current.disconnect();
            setLoadingNewPage(false);
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (hasMore) {
                    setPageNumber(state => state + 1);
                    setLoadingNewPage(true);
                }
            }
        });
        if (node) observer.current.observe(node);

    }, [hasMore, loading])

    const [postsList, setPostList] = useState([]);

    const getPostsList = useCallback(() => Promise.all(posts.map(async (post, index) => {
        const userFetch = await getUserById(post.userId); // Problem polega na tym, że przy każym ruchu wykonujemy render dla wszystkich występujących uzytkownikow wyzej.
        const user = userFetch.data;

        return (
            <React.Fragment>
                <ContainerInside key={post.postId} ref={posts.length === index + 1 ? lastPostElementRef : null}>
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
    })), [lastPostElementRef, posts]);

    useEffect(() => {
        getPostsList().then((results) => {
            setPostList(results);
        })
    }, [getPostsList])

    return (
        <React.Fragment>
            <AddPost setLoading={setLoading} setPosts={setPosts} posts={posts} />
            <EditPostPopup active={popupActive} setActive={setPopupActive} post={activePost} posts={posts} setPosts={setPosts} />
            {loading ? "Ładowanie witryny..." : postsList}
            {loadingNewPage && "Ładowanie nowej strony... "}
            {hoverActive && <Hover active={hoverActive} user={hoverUser} style={hoverCords} />}
        </React.Fragment>
    )
}

export default PostsList;