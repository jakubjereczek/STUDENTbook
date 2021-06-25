import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { ContainerInside, UserIcon, Author, ButtonIcon, Text } from '../../../components/SharedStyles.css'
import { AboutUser, DateString, PostContent, PostButtons, ChoiceButtonsContainer, ChoiceButton } from './PostsList.css'

import { FaRegTimesCircle, FaRegEdit } from "react-icons/fa";

import { deletePost, getAllPosts } from '../../../services/PostService'
import { getUserById } from '../../../services/UserService'

import AddPost from '../components/AddPost'

import Hover from './Hover';

import toast from 'react-hot-toast';
import EditPostPopup from './EditPostPopup';

import useMap from '../../../hooks/useMap'

import { SEARCH_ALL, SEARCH_BY_UNIVERSITY } from '../../../constants/'

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
    const [loadingNewPage, setLoadingNewPage] = useState(true);

    // pagination
    // TODO: Pagination in Server side. 
    // I should to get posts (example ten for page) with every scroll, not everythings.
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [addItem, removeItem, getItem] = useMap();

    const [filterMode, setFilterMode] = useState(SEARCH_ALL);

    const handleFilterMode = (type) => {
        setPosts([]);
        setPageNumber(1);

        switch (type) {
            case SEARCH_ALL:
                if (filterMode === SEARCH_ALL)
                    return;
                setFilterMode(SEARCH_ALL);
                break;
            case SEARCH_BY_UNIVERSITY:
                if (filterMode === SEARCH_BY_UNIVERSITY)
                    return;
                setFilterMode(SEARCH_BY_UNIVERSITY);
                break;
            default:
                setFilterMode(SEARCH_ALL);
                break;
        }
    }
    useEffect(() => {
        async function fetchData() {
            const postsFetch = await getAllPosts(pageNumber, pageSize, filterMode);
            console.log("POBRANO NOWĄ LISTE WIADOMOSCI ", postsFetch)
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
    }, [pageNumber, filterMode])


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

    // TODO: Asychroniczność w podejściu do tego, ze występuje bląd - dodanie następuja na końcu wywołania i przez to wysylamy dodatkowe requesty. Przy następnym wywolaniu - do poprzednich wszystko dziala idealnie, ale znowu wysyla po kilka requestów w stosunku powtarajacych sie uzytkownikow.

    const getPostsList = useCallback(() => Promise.all(
        posts.map(async (post, index) => {
            // TODO: Del that checking inside.

            const currentlyMapListOfUsers = new Map(); // Naprawienie blędu z interacją dla pojawiających się wpisów użytkownika - jeśli występuję ponownie następuje sprawdzenie w zmiennej.
            //console.log(currentlyMapListOfUsers)

            const savedUser = await getItem(post.userId); // Lista grupująca po zakończeniu wszystkich iteracji!
            let user = savedUser;

            if (savedUser === undefined) {
                // Jeśli nie istnieje w liście wszystkich.
                // Sprawdzam jeszcze w liście aktualnych iteracji.
                const userWasMentioned = currentlyMapListOfUsers.get(post.userId);
                if (userWasMentioned === undefined) {
                    const userFetch = await getUserById(post.userId);
                    user = userFetch.data;

                    currentlyMapListOfUsers.set(post.userId, user);
                    // console.log("DODANIE DO LOKALNEJ LISTY")
                } else {
                    user = userWasMentioned;
                }
                await addItem(user.userId, user);

                // Dodanie do listy Set użytkowników, aby wyżej sprawdzić czy sie nie powiela i pobrać użytkownika z listy, a nie robic kolejnego requesta do bazy.
            }

            return (
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
            <ChoiceButtonsContainer>
                <ChoiceButton onClick={() => handleFilterMode(SEARCH_ALL)}>Wszystkie posty</ChoiceButton>
                <ChoiceButton onClick={() => handleFilterMode(SEARCH_BY_UNIVERSITY)}>Posty z Twojego Uniwersytetu</ChoiceButton>
            </ChoiceButtonsContainer>
            {loading ? (loadingNewPage ? "Ładowanie nowej strony... " : "Ładowanie witryny") : postsList}
            {/* {hoverActive && <Hover active={hoverActive} user={hoverUser} style={hoverCords} />} */}
        </React.Fragment>
    )
}

export default PostsList;