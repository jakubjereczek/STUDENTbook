import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../services/AuthorizationService';
import { Container, EmptyContainer } from '../components'

function MyRoute({ component, ...props }) {

    const userStatus = useAuth();
    const isUserAuthorizated = userStatus.isUserAuthorizated();

    console.log(isUserAuthorizated + "IS uSER AUTH")

    const { isPrivate, onlyForGuests } = props;

    let areYouGuest = true;
    if (onlyForGuests) {
        if (isUserAuthorizated)
            areYouGuest = false;
    }

    return (
        isPrivate ? (
            isUserAuthorizated ?
                (
                    <Container>
                        <Route {...props} component={component} />
                    </Container>
                )
                : <Redirect to="/login" />
        ) : (
                areYouGuest ?
                    (
                        <EmptyContainer>
                            <Route {...props} component={component} />
                        </EmptyContainer>
                    ) : <Redirect to="/" />
            )
    )
}

export default MyRoute;