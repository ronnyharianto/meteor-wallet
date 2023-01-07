import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { RoutePaths } from "./RoutePaths";
import { Access } from "./Access";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import { LoggedUserOnly } from "./Components/LoggedUserOnly";
import { AnonymousOnly } from "./Components/AnonymousOnly";

export const Router = () => (
    <Routes>
        <Route path={RoutePaths.HOME} element={<LoggedUserOnly><Home /></LoggedUserOnly>} />
        <Route path={RoutePaths.ACCESS} element={<AnonymousOnly><Access /></AnonymousOnly>} />
        <Route path={RoutePaths.FORGOT_PASSWORD} element={<AnonymousOnly><ForgotPassword /></AnonymousOnly>} />
        <Route path={`${RoutePaths.RESET_PASSWORD}/:token`} element={<AnonymousOnly><ResetPassword /></AnonymousOnly>} />
        <Route path={RoutePaths.NOT_FOUND} element={<NotFound />} />
    </Routes>
)