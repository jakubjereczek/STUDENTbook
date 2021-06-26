import React, { useEffect, useState, useMemo } from 'react'
import {
    useParams
} from "react-router-dom";
import { useAuth } from '../../services/AuthorizationService';
import { getUserById } from '../../services/UserService';
import { deletePost } from '../../services/PostService'

import { AboutUserContainer, AboutUserData, DetailsUserContainer, DetailsUserBar, ResultsList, PostContent, PostAuthor, PostDate, PostButtons,TextInline } from './Profile.css';
import { UserIconLarge, Text, ButtonIcon } from '../../components/SharedStyles.css'

import { FaRegTimesCircle } from "react-icons/fa";

import { getPostAnswersByUserName, deletePostAnswer } from '../../services/PostAnswersService'
import {getPostsByUserName} from '../../services/PostService';
import toast from 'react-hot-toast';

function Profile() {

    const POSTS = 'posts';
    const POST_ANSWERS = 'postAnswers';

    const [user, setUser] = useState(null); 
    const [posts, setPosts] = useState(null);
    const [postAnswers, setPostAnswers] = useState(null);

    const [loading, setLoading] = useState(true);
    const [menuActiveElement, setMenuActiveElement] = useState(POSTS);
    const userStatus = useAuth();

    let { id } = useParams();

    useEffect(() => {
        if (id === undefined) {
            id = userStatus.user.userId;
        }
        getUserById(id)
            .then((response) => {
                setUser(response.data);
                fetchPostsAnswers(response.data.nick);
                fetchPosts(response.data.nick);
            }).catch(() => {
                setUser(null);
            }).finally(() => {
                setLoading(false);
            })
            
    }, []);

    const fetchPostsAnswers = async (nick) => {
        getPostAnswersByUserName(nick)
            .then((response) => {
                setPostAnswers(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const fetchPosts = async (nick) => {
        getPostsByUserName(nick)
            .then((response) => {
                setPosts(response.data);
            }).catch((err) => {
                console.log(err);
            })
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

    const postsComponent = posts && posts.map((post, index) => {
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

    const postsAnswersComponent = postAnswers && postAnswers.map((postA, index) => {
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


    return loading ? "Ładowanie.." : (
        user ? (
            <React.Fragment>
                <AboutUserContainer>
                    <UserIconLarge />
                    <AboutUserData>
                        <h1>{user.firstName} {user.lastName}</h1>
                        {/* <h3>{user.University.name}</h3> */}
                        {/* <p>Posty: {user.Posts.length}</p> */}
                    </AboutUserData>
                </AboutUserContainer>
                <DetailsUserContainer>
                    <DetailsUserBar>
                        <a className={`${menuActiveElement === POSTS ? "active" : ""}`} onClick={() => setMenuActiveElement(POSTS)}>POSTY</a>
                        <a className={`${menuActiveElement === POST_ANSWERS ? "active" : ""}`} onClick={() => setMenuActiveElement(POST_ANSWERS)}>ODPOWIEDZI NA POSTY</a>
                    </DetailsUserBar>
                    <ResultsList>
                        {menuActiveElement === POSTS 
                        && postsComponent && (postsComponent.length > 0 ? postsComponent : <Text>Brak postów</Text>)}

                        {menuActiveElement === POST_ANSWERS 
                        && postsAnswersComponent && (postsAnswersComponent.length > 0 ? postsAnswersComponent : <Text>Brak odpowiedzi na posty</Text>) }
                    </ResultsList>
                </DetailsUserContainer>
            </React.Fragment>
        ) : "Użytkownik nie istnieje.")

}

export default Profile;