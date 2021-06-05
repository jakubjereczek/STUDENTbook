import React, { useState, useEffect } from 'react';
import { IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonCardContent, IonButton, IonContent, IonLabel, IonList, IonListHeader, IonThumbnail, IonAvatar, IonLoading } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import './Posts.css';
import { getAllPosts } from '../services/PostService';

import MainContainer from '../components/MainContainer';
import Post from '../models/post';
import profileImage from '../assets/user.png'




const Posts: React.FC = () => {
  const name = "Posty";

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const posts = await getAllPosts();
      setPosts(posts.data);
      console.log(posts.data)
      setLoading(false);
    }
    fetchData();
  }, [])


  const postsList = posts && posts.map<JSX.Element>((post: Post | any) => {

    return (
      <IonItem key={post.postId}>
        <IonAvatar slot="start">
          <img src={profileImage}></img>
        </IonAvatar>
        <IonLabel>
          <h2>{post.Users.firstName} {post.Users.lastName}</h2>
          <h3>{post.Users.University.name}</h3>
          <p>{post.content.length > 50 ? `${post.content.slice(0, 50)}...` : post.content}</p>
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
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainContainer name={name}>
          <IonList>
            {postsList}
            <IonLoading
              isOpen={loading}
              message={'Ładowanie postów...'}
              duration={1000}></IonLoading>
          </IonList>
        </MainContainer>
      </IonContent>
    </IonPage >
  );
};

export default Posts;
