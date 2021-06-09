import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonList, IonLabel, IonAvatar } from '@ionic/react';
import MainContainer from '../components/MainContainer';
import './Users.css';
import { Link } from 'react-router-dom';


import { getAllUsers } from '../services/UserService'
import User from '../models/user';

import { personCircle } from "ionicons/icons";

const Users: React.FC = () => {
  const name = "Użytkownicy";

  const [searchText, setSearchText] = useState('');

  const [users, setUsers] = useState<Array<User>>([]);
  const [filtred, setFiltredUsers] = useState<Array<User>>([]);


  useEffect(() => {
    function fetchData() {
      getAllUsers()
        .then((response: Response | any) => {
          setUsers(response.data);
        })
    }
    fetchData();
  }, [])

  const userList = users && users.map((user) => {

    const { firstName, lastName } = user;
    const fullname = firstName + " " + lastName;

    if (fullname.toLowerCase().includes(searchText.toLowerCase()) || searchText.length === 0) {
      return (
        <Link to={`/profile/${user.userId}`}>
          <IonItem key={user.userId}>
            <IonAvatar slot="start">
              <img src={personCircle}></img>
            </IonAvatar>
            <IonLabel>
              {user.firstName} {user.lastName}
            </IonLabel>
          </IonItem>
        </Link>)
    }
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

          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
          <IonList>
            {userList}
          </IonList>
        </MainContainer>
      </IonContent>
    </IonPage>
  );
};

export default Users;
