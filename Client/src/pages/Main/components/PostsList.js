import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { ContainerInside, UserIcon, Author, ButtonIcon, Text, ErrorMessageContainer, Button } from '../../../components/SharedStyles.css'
import { AboutUser, DateString, PostContent, PostButtons, ChoiceButtonsContainer, ChoiceButton, UniversityTag, AboutUserHeader } from './PostsList.css'

import { FaRegTimesCircle, FaRegEdit, FaPlug } from "react-icons/fa";

import { deletePost, getAllPosts } from '../../../services/PostService'
import { getUserById } from '../../../services/UserService'

import AddPost from '../components/AddPost'

import Hover from './Hover';

import toast from 'react-hot-toast';
import EditPostPopup from './EditPostPopup';

import useMap from '../../../hooks/useMap'

import { SEARCH_ALL, SEARCH_BY_UNIVERSITY } from '../../../constants/'

import { LoadingIndicator, ErrorContainer } from '../../../components'

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
    const [error, setError] = useState("");
    const [loadingNewPage, setLoadingNewPage] = useState(true);

    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [addItem, getItem] = useMap();

    const [filterMode, setFilterMode] = useState(SEARCH_ALL);

    const filters = [{ type: SEARCH_ALL, name: "Wszystkie" }, { type: SEARCH_BY_UNIVERSITY, name: "Z twojego uniwersytetu" }]
    const handleFilterMode = (type) => {
        setPageNumber(1);

        switch (type) {
            case SEARCH_ALL:
                if (filterMode === SEARCH_ALL)
                    return;
                setFilterMode(SEARCH_ALL);
                setPosts([]);
                setLoading(true)

                break;
            case SEARCH_BY_UNIVERSITY:
                if (filterMode === SEARCH_BY_UNIVERSITY)
                    return;
                setFilterMode(SEARCH_BY_UNIVERSITY);
                setPosts([]);
                setLoading(true)

                break;
            default:
                setFilterMode(SEARCH_ALL);
                setPosts([]);
                break;
        }
    }

    const asyncFetchData = async () => {
        try {
            setLoading(true);
            setError("");
            const postsFetch = await getAllPosts(pageNumber, pageSize, filterMode);
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
        } catch {
            setError("Wystąpił bład podczas ładowania listy postów");
            setLoading(false);
        }

    }

    useEffect(() => asyncFetchData(),
        [pageNumber, filterMode])

    const handleMouseEnter = (event, user) => {
        setHoverCords({
            top: event.clientY + 10,
            left: event.clientX
        })
        setHoverUser(user)
        setHoverActive(true)
    }
    const handleMouseLeave = () => {
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
            setLoadingNewPage(false)
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
            const savedUser = await getItem(post.userId); // Sprawdzenie w liście. Jeśli nie istnieje, pobranie z bazy.
            let user = savedUser;

            if (savedUser === undefined) {
                const userFetch = await getUserById(post.userId);
                user = userFetch.data;
            }
            await addItem(user.userId, user);

            return (
                <ContainerInside key={post.postId} ref={posts.length === index + 1 ? lastPostElementRef : null}>
                    <AboutUser>
                        <UserIcon />
                        <AboutUserHeader>
                            <Link to={`/profile/${post.userId}`}>
                                <Author
                                    onMouseEnter={(event) => handleMouseEnter(event, user)}
                                    onMouseLeave={handleMouseLeave}>
                                    {user.firstName} {user.lastName}
                                </Author>
                            </Link>
                            <UniversityTag>{user.University.name}</UniversityTag>
                        </AboutUserHeader>
                    </AboutUser>

                    <PostContent>
                        <Text>
                            {post.content}
                            <DateString>
                                {new Date(post.createdAt).toLocaleString()}
                            </DateString>
                        </Text>
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

    const postsListComponent = loading ? <LoadingIndicator /> : (
        !error ? (
            <React.Fragment>
                {postsList}
                {loadingNewPage && <LoadingIndicator />}
            </React.Fragment>) :
            (
                <ErrorContainer error={error} callback={asyncFetchData} />
            )
    )

    const choiceButtons = filters.map((filter) => {

        let className = "";
        if (filterMode === filter.type) {
            className = "active";
        }

        const handleOnClick = () => handleFilterMode(filter.type)

        return (
            <ChoiceButton className={className} onClick={handleOnClick}>
                {filter.name}
            </ChoiceButton>
        )
    })

    return (
        <React.Fragment>
            <AddPost setPosts={setPosts} posts={posts} />
            <EditPostPopup active={popupActive} setActive={setPopupActive} post={activePost} posts={posts} setPosts={setPosts} />
            <ChoiceButtonsContainer>
                {choiceButtons}
            </ChoiceButtonsContainer>
            {postsListComponent}

            {hoverActive && <Hover active={hoverActive} user={hoverUser} style={hoverCords} />}
        </React.Fragment>
    )
}

export default PostsList;