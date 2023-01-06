import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { RoutePaths } from "./RoutePaths";
import { Access } from "./Access";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";

export const Router = () => (
    <Routes>
        <Route path={RoutePaths.HOME} element={<Home />} />
        <Route path={RoutePaths.ACCESS} element={<Access />} />
        <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={`${RoutePaths.RESET_PASSWORD}/:token`} element={<ResetPassword />} />
        <Route path={RoutePaths.NOT_FOUND} element={<NotFound />} />
    </Routes>
)