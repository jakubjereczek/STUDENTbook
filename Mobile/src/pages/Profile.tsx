import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonItem } from '@ionic/react';
import { useParams } from "react-router-dom";
import MainContainer from '../components/MainContainer';
import './Profile.css';
import { useAuth } from '../services/AuthorizationService';
import User from '../models/user';
import Post from '../models/post';
import { useEffect, useState } from 'react';
import { getPostAnswersByUserName } from '../services/PostAnswerService'
import PostAnswer from '../models/postAnswer';
import { getUserById } from '../services/UserService';

const Profile: React.FC = () => {
  const name = "Profil";

  const userService = useAuth();
  const [user, setUser] = useState<User | any>();
  const [loading, setLoading] = useState(true);

  const [postAnswersList, setPostAnswersList] = useState([]);

  const handleLogout = () => userService.logout();

  let { id }: any = useParams();

  const postsList = user && user.Posts && user.Posts.map((post: Post, index: number) => {
    return (
      <IonItem key={post.postId}>
        <p>{index + 1}. {post.content}</p>
      </IonItem>
    )
  })

  const postsAnswersList = postAnswersList && postAnswersList.map((post: PostAnswer, index: number) => {
    return (
      <IonItem key={post.answerId}>

        <p> <span>(...) </span> {index + 1}.{post.content}</p>
      </IonItem>
    )
  })

  useEffect(() => {
    async function fetchData() {
      if (id == undefined) {
        if (userService.user)
          id = userService.user.userId
      }
      getUserById(id).then((response: Response | any) => {
        setUser(response.data);
        getPostAnswersByUserName(response.data.nick).then((response: Response | any) => {
          setPostAnswersList(response.data);
        }).catch((error: Error) => {
          console.log(error);
        }).finally(() => {
          setLoading(false);
        })
      }).catch(() => {
        setUser(null);
      })

    }
    fetchData();
  }, [id])

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
          <IonButton expand="block" color="primary" onClick={handleLogout}>Wyloguj się</IonButton>
          {!loading && (
            <IonGrid>
              <IonRow>
                <h3>Witaj, {user?.firstName} {user?.lastName}</h3>
              </IonRow>
              <IonRow>
                <span>{user?.University.name}</span>
              </IonRow>
              <IonRow>
                <h4>Posty</h4>
              </IonRow>
              <IonRow>
                {postsList && postsList.length > 0 ? postsList : <p>Brak postów.</p>}
              </IonRow>
              <IonRow>
                <h4>Odpowiedzi na posty</h4>
              </IonRow>
              <IonRow>
                {postAnswersList && postAnswersList.length > 0 ? postsAnswersList : <p>Brak odpowiedzi na posty.</p>}
              </IonRow>
            </IonGrid>)}
        </MainContainer>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
