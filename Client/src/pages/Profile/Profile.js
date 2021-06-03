import React, { useEffect, useState } from 'react'
import {
    useParams
} from "react-router-dom";
import { useAuth } from '../../services/AuthorizationService';
import { getUserById } from '../../services/UserService';

import { AboutUserContainer, AboutUserData, DetailsUserContainer, DetailsUserBar, ResultsList } from './Profile.css';
import { UserIconLarge } from '../../components/SharedStyles.css'

import { getPostAnswersByUserName } from '../../services/PostAnswersService'

function Profile() {

    const POSTS = 'posts';
    const POST_ANSWERS = 'postAnswers';

    const [user, setUser] = useState(null); // user + univ and posts
    const [postAnswers, setPostAnswers] = useState(null);

    const [loading, setLoading] = useState(true);
    const [menuActiveElement, setMenuActiveElement] = useState(POSTS);
    const userStatus = useAuth();

    const { id } = useParams();

    useEffect(() => {
        if (id == undefined) { // Pobieramy dla aktualnego użytkownika
            setUser(userStatus.user)
            setLoading(false);
        } else { // Pobieramy dla wybranego uzytkownika
            getUserById(id).then((response) => {
                setUser(response.data);
                fetchPostsAnswers(response.data.nick);
            }).catch(() => {
                setUser(null);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [id, userStatus.user]);

    const posts = user && user.Posts.map((post, index) => {
        return (
            <div key={post.postId}>
                #{index + 1} {post.content}
            </div>
        )
    });

    const postsAnswers = postAnswers && postAnswers.map((postA, index) => {
        return (
            <div key={postA.postAnswerId}>
                #{index + 1} {postA.content}
            </div>
        )
    });

    const fetchPostsAnswers = async (nick) => {
        getPostAnswersByUserName(nick)
            .then((response) => {
                setPostAnswers(response.data);
            }).catch((err) => {
                console.log(err);
            })

    }

    return loading ? "Ładowanie.." : (
        user ? (
            <React.Fragment>
                <AboutUserContainer>
                    <UserIconLarge />
                    <AboutUserData>
                        <h1>{user.firstName} {user.lastName}</h1>
                        <h3>{user.University.name}</h3>
                        <p>Posty: {user.Posts.length}</p>
                    </AboutUserData>
                </AboutUserContainer>
                <DetailsUserContainer>
                    <DetailsUserBar>
                        <a className={`${menuActiveElement === POSTS ? "active" : ""}`} onClick={() => setMenuActiveElement(POSTS)}>POSTY</a>
                        <a className={`${menuActiveElement === POST_ANSWERS ? "active" : ""}`} onClick={() => setMenuActiveElement(POST_ANSWERS)}>ODPOWIEDZI NA POSTY</a>
                    </DetailsUserBar>
                    <ResultsList>
                        {menuActiveElement === POSTS && posts}
                        {menuActiveElement === POST_ANSWERS && postsAnswers}
                    </ResultsList>
                </DetailsUserContainer>
            </React.Fragment>


        ) : "Użytkownik nie istnieje.")

}

export default Profile;