import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainContainer from '../components/MainContainer';
import './Posts.css';

const Posts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posty</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainContainer name="Tab 3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt, aliquam!
        </MainContainer>
      </IonContent>
    </IonPage>
  );
};

export default Posts;
