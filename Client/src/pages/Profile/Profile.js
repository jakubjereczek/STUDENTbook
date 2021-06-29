import React, { useEffect, useState, useMemo } from 'react'
import {
    useParams
} from "react-router-dom";
import { useAuth } from '../../services/AuthorizationService';
import { getUserById } from '../../services/UserService';
import { deletePost } from '../../services/PostService'

import Chart from './Chart';
import { LoadingIndicator, ErrorContainer } from '../../components/'

import { AboutUserContainer, AboutUserData, DetailsUserContainer, DetailsUserBar, ResultsList, PostContent, PostAuthor, PostDate, PostButtons, TextInline } from './Profile.css';
import { UserIconLarge, Text, ButtonIcon, ContainerInside } from '../../components/SharedStyles.css'

import { FaRegTimesCircle } from "react-icons/fa";

import { getPostAnswersByUserName, deletePostAnswer } from '../../services/PostAnswersService'
import { getPostsByUserName } from '../../services/PostService';
import toast from 'react-hot-toast';

const POSTS = 'Posty';
const POST_ANSWERS = 'Odpowiedzi na posty';

function Profile() {

    const availableButtons = [POSTS, POST_ANSWERS];

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [postAnswers, setPostAnswers] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [menuActiveElement, setMenuActiveElement] = useState(POSTS);
    const userStatus = useAuth();

    let { id } = useParams();

    useEffect(() => {
        if (id === undefined) {
            id = userStatus.user.userId;
        }
        loadUserAsync();
    }, [id]);

    const loadUserAsync = async () => {
        setLoading(true);
        setError("")

        return getUserById(id)
            .then((response) => {
                const promises = [
                    fetchPostsAnswers(response.data.nick),
                    fetchPosts(response.data.nick)
                ]
                Promise.all(promises)
                    .finally(() => {
                        setUser(response.data);
                        setLoading(false);
                    })
            }).catch(() => {
                setError("Wystąpił problem podczas pobierania użytkownika")
                setLoading(false);
                setUser(null);
            });
    }

    const fetchPostsAnswers = async (nick) => {
        return getPostAnswersByUserName(nick)
            .then((response) => {
                setPostAnswers(response.data);
            }).catch(() => {
                setError("Wystąpił problem podczas pobierania odpowiedzi na posty użytkownika")
            })
    }

    const fetchPosts = async (nick) => {
        return getPostsByUserName(nick)
            .then((response) => {
                setPosts(response.data);
            }).catch(() => {
                setError("Wystąpił problem podczas pobierania postów użytkownika")
            });
    }

    const deletePostAction = (post) => {
        const postsUpdated = posts.filter(p => p !== post);
        setPosts(postsUpdated);
        deletePost(post.postId)
            .then(() => {
                toast.success('Post został usunięty.')
            }).catch(() => {
                toast.error('Wystąpił błąd podczas usuwania posta.')
            })
    }

    const deletePostAnswerAction = (postA) => {
        const postsAnswers = postAnswers.filter(p => p !== postA);
        setPostAnswers(postsAnswers);
        deletePostAnswer(postA.postAnswerId)
            .then(() => {
                toast.success('Odpowiedz na post została usunięta.')
            }).catch(() => {
                toast.error('Wystąpił błąd podczas usuwania odpowiedzi na posta.')
            })
    }

    const postsComponent = !loading && !error && posts.map((post, index) => {
        return (
            <PostContent key={post.postId}>
                <TextInline>
                    <PostAuthor>{user.firstName} {user.lastName}</PostAuthor>
                    <PostDate> {new Date(post.createdAt).toLocaleString()}</PostDate>
                </TextInline>
                {post.content}

                <PostButtons>
                    {post.userId === userStatus.user.userId && (<ButtonIcon onClick={() => deletePostAction(post)}>
                        <FaRegTimesCircle />
                    </ButtonIcon>)}
                </PostButtons>
            </PostContent>
        )
    });

    const postsAnswersComponent = !loading && !error && postAnswers.map((postA, index) => {
        return (
            <PostContent key={postA.postAnswerId}>
                (...)

                <TextInline>
                    <PostAuthor>{user.firstName} {user.lastName}</PostAuthor>
                    <PostDate> {new Date(postA.createdAt).toLocaleString()}</PostDate>
                </TextInline>
                {postA.content}

                <PostButtons>
                    {postA.userId === userStatus.user.userId && (<ButtonIcon onClick={() => deletePostAnswerAction(postA)}>
                        <FaRegTimesCircle />
                    </ButtonIcon>)}
                </PostButtons>

            </PostContent>
        )
    });

    const postsAndPostsAnswersSharedComponent = () => {
        switch (menuActiveElement) {
            case POSTS:
                if (postsComponent.length) {
                    return postsComponent;
                } else {
                    return <Text>Brak postów</Text>
                }
            case POST_ANSWERS:
                if (postsAnswersComponent.length) {
                    return postsAnswersComponent;
                } else {
                    return <Text>Brak odpowiedzi na posty</Text>
                }
            default:
                return [];
        }
    }

    const menuButtons = availableButtons.map((button) => {
        let className = "";
        if (menuActiveElement === button) {
            className = "active";
        }
        const handleOnClick = () => setMenuActiveElement(button);
        return (
            <a className={className}
                onClick={handleOnClick}>{button}</a>
        )

    })

    return loading ? <LoadingIndicator /> : error ? (
        <ErrorContainer error={error} callback={loadUserAsync} />
    ) : (
        user ? (
            <React.Fragment>
                <AboutUserContainer>
                    <UserIconLarge />
                    <AboutUserData>
                        <h1>{user.firstName} {user.lastName}</h1>
                        <h3>{user.University.name}</h3>
                        <p>Posty: {posts.length}</p>
                        <p>Odpowiedzi na posty: {postAnswers.length}</p>
                    </AboutUserData>
                </AboutUserContainer>
                <ContainerInside>
                    <Chart posts={posts} postAnswers={postAnswers} />
                </ContainerInside>
                <DetailsUserContainer>
                    <DetailsUserBar>
                        {menuButtons}
                    </DetailsUserBar>
                    <ResultsList>
                        {postsAndPostsAnswersSharedComponent()}
                    </ResultsList>
                </DetailsUserContainer>
            </React.Fragment>
        ) : "Użytkownik nie istnieje.")

}

export default Profile;