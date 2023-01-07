import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from "./Loading";
import { RoutePaths } from "../../infra/RoutePaths";

export const AdminOnly = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    useEffect(() => {
        Meteor.call('roles.IsAdmin', (error, isAdminReturn) => {
            if (error) {
                setIsAdmin(false);
            }
            else {
                setIsAdmin(isAdminReturn);
            }
        })
    }, [])

    if (isAdmin == null) {
        return <Loading />;
    }

    if (!isAdmin) {
        return <Navigate to={RoutePaths.HOME} state={{ from: location }} replace />;
    }

    return children;
}