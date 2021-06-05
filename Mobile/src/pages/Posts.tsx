import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonCardContent, IonButton, IonContent, IonLabel, IonList, IonListHeader, IonThumbnail, IonAvatar, IonRefresher, IonRefresherContent, IonRouterLink, IonTextarea, IonAlert } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

import { personCircle } from "ionicons/icons";
import './Posts.css';
import { getAllPosts } from '../services/PostService';

import MainContainer from '../components/MainContainer';
import Post from '../models/post';
import profileImage from '../assets/user.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthorizationService';
import { postPost } from '../services/PostService'
import User from '../models/user';


const Posts: React.FC = () => {
  const name = "Posty";

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState(true);

  const userService = useAuth();
  const user = userService.user;

  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");


  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("");


  useEffect(() => {
    async function init() {
      await fetchData();
    }
    init();
  }, [])

  async function fetchData() {
    const posts = await getAllPosts();
    setPosts(posts.data);
    console.log(posts.data)
    setLoading(false);
  }

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    fetchData()
      .finally(() => {
        event.detail.complete();
      })
  }


  const postsList = posts && posts.map<JSX.Element>((post: Post | any) => {

    return (
      <IonItem key={post.postId}>
        <IonAvatar slot="start">
          <img src={profileImage}></img>
        </IonAvatar>
        <IonLabel>
          <h2><Link to={`/profile/${post.userId}`}>{post.Users.firstName} {post.Users.lastName}</Link></h2>
          <h3>{post.Users.University.name}</h3>
          <p>{post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}</p>
        </IonLabel>
      </IonItem>
    )
  })

  const handleAddPost = () => {
    console.log(content)
    if (content.length < 30) {
      setMessage("Post musi być dłuzszy niż 30 znaków!");
      setIserror(true);
      return;
    }

    if (!user)
      return;

    const post: Post = {
      userId: user.userId,
      content,
      tag,
      createdAt: new Date(),
      editedAt: null
    }
    postPost(user.userId, post)
      .then((response: Response | any) => {
        const postsAll = [...posts, response.data];
        setPosts(postsAll);
        setContent("")
        setTag("")
      })
      .catch(() => {
        setMessage("Wystąpił bład podczas dodawania posta!");
        setIserror(true);
      })

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainContainer name={name}>
          <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            header={"Bląd!"}
            message={message}
            buttons={["OK"]}
          />
          <div>
            <form className="ion-padding">
              <IonItem>
                <IonLabel position="floating">Treść posta</IonLabel>
                <IonTextarea
                  value={content}
                  onInput={(event) => setContent((event.target as HTMLInputElement).value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Tag</IonLabel>
                <IonInput
                  value={tag}
                  onInput={(event) => setTag((event.target as HTMLInputElement).value)}
                  type="text" />
              </IonItem>
              <IonButton expand="block" color="primary" onClick={handleAddPost}>Dodaj post</IonButton>
            </form>

          </div>
          <IonList>
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
              <IonRefresherContent
                pullingIcon={chevronDownCircleOutline}
                pullingText="Pociagnij aby odwieżyć"
                refreshingSpinner="circles"
                refreshingText="Odswieżam liste postów..." >
              </IonRefresherContent>
            </IonRefresher>
            {postsList}
          </IonList>
        </MainContainer>
      </IonContent>
    </IonPage >
  );
};

export default Posts;
