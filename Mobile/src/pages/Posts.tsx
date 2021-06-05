import React, { useState, useEffect } from 'react';
import { IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonCardContent, IonButton, IonContent, IonLabel, IonList, IonListHeader, IonThumbnail, IonAvatar, IonRefresher, IonRefresherContent, IonRouterLink } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';

import { personCircle } from "ionicons/icons";
import './Posts.css';
import { getAllPosts } from '../services/PostService';

import MainContainer from '../components/MainContainer';
import Post from '../models/post';
import profileImage from '../assets/user.png'
import { Link } from 'react-router-dom';




const Posts: React.FC = () => {
  const name = "Posty";

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState(true);

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
