import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chatboxEllipses, peopleCircle, person } from 'ionicons/icons';

import Posts from './pages/Posts';
import Users from './pages/Users';
import Profil from './pages/Profile';

import Login from './pages/Login'

import { useAuth } from './services/AuthorizationService';
const RoutingTable: React.FC = () => {

    const userService = useAuth();

    const isUserAuth = userService.isUserAuthorizated();

    return (
        <IonReactRouter>
            {isUserAuth ? (
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/posts">
                            <Posts />
                        </Route>
                        <Route exact path="/users">
                            <Users />
                        </Route>
                        <Route path="/profile/:id?">
                            <Profil />
                        </Route>
                        <Route exact path="/">
                            {/* Domyślna ścieżka */}
                            <Redirect to="/posts" />
                        </Route>
                    </IonRouterOutlet >
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="posts" href="/posts">
                            <IonIcon icon={chatboxEllipses} />
                            <IonLabel>Posty</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="users" href="/users">
                            <IonIcon icon={peopleCircle} />
                            <IonLabel>Użytkownicy</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="profile" href="/profile">
                            <IonIcon icon={person} />
                            <IonLabel>Profil</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs >

            ) : (
                    <Login />
                )}

        </IonReactRouter >
    );
}
export default RoutingTable;
