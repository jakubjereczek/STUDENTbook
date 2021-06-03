import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import MyRoute from './components/MyRoute';
import { useAuth } from './services/AuthorizationService';

import { Main, NotFound, Login, Profile } from './pages'

function RoutingTable() {


    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <MyRoute isPrivate exact path="/" component={Main} />
                <MyRoute isPrivate path="/profile/:id?" component={Profile} />

                {/* Routy do których zalogowany użytkownik nie ma mieć dostępu */}
                <MyRoute onlyForGuests path="/login" component={Login} />
                <MyRoute component={NotFound} />
            </Switch>
        </Router>

    )
}

export default RoutingTable;