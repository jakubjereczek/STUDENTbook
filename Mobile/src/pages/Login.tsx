
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';

import { useAuth } from '../services/AuthorizationService';

const Login: React.FC = () => {
    const userService = useAuth();

    const [nick, setNick] = useState<string>("jankowalski");
    const [password, setPassword] = useState<string>("kowalski123");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleLogin = () => {
        if (!nick) {
            setMessage("Nie wprowadzono nazwy użytkownika.");
            setIserror(true);
            return;
        }

        if (!password || password.length < 3) {
            setMessage("Nie wprowadzono hasła, lub jest zbyt krotkie.");
            setIserror(true);
            return;
        }

        userService.login(nick, password)
            .then((response: Response) => {
                console.log(response)
            }).catch((error: Error) => {
                console.log(error);
                setMessage("Użytkownik o takich danych nie istnieje!");
                setIserror(true);
            })
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonAlert
                                isOpen={iserror}
                                onDidDismiss={() => setIserror(false)}
                                header={"Bląd!"}
                                message={message}
                                buttons={["OK"]}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                color="primary"
                                style={{ fontSize: "128px" }}
                                icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Nick</IonLabel>
                                <IonInput
                                    type="email"
                                    value={nick}
                                    onIonChange={(e) => setNick(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Hasło</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={handleLogin}>Zaloguj</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;