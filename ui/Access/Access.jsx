import React from "react";
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from "react-router";
import { RoutePaths } from "../../infra/RoutePaths";
import { NotificationAlert, NotificationState } from "../Components/NotificationAlert"

export const Access = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [notificationMessage, setNotificationMessage] = React.useState("");
    const [notificationState, setNotificationState] = React.useState(NotificationState.HIDE);
    const [isSignUp, setIsSignUp] = React.useState(true);
    const navigate = useNavigate();

    const resetForm = () => {
        setNotificationState(NotificationState.HIDE);
        setEmail("");
        setPassword("");
    }

    const processAccess = () => {
        const CallBackError = (errorResponse) => {
            if (errorResponse) {
                setNotificationMessage(errorResponse.reason);
                setNotificationState(NotificationState.ERROR);
            }
            else {
                navigate(RoutePaths.HOME);
            }
        }

        if (isSignUp) {
            Accounts.createUser({
                email: email,
                password: password
            }, CallBackError)
        }
        else {
            Meteor.loginWithPassword(email, password, CallBackError);
        }
    }

    const loginWithGoogle = (e) => {
        e.preventDefault();
        Meteor.loginWithGoogle({
            loginStyle: 'redirect'
        })
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="px-3 py-2 text-lg text-base font-medium">{isSignUp ? "Sign Up" : "Sign In"}</h3>

            <form className="mt-6">
                <NotificationAlert message={notificationMessage} state={notificationState} />
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-around px-2 py-3 text-right">
                    <button
                        type="button"
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        onClick={processAccess}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button >
                    <button
                        type="button"
                        className="bg-indigo-100 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        onClick={() => navigate(RoutePaths.HOME)}
                    >
                        Cancel
                    </button >
                </div>
                <div className="py-3">
                    {isSignUp ? "Already Have Account?" : "Register New Account?"}
                    <a
                        className="cursor-pointer ml-2"
                        href="#"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            resetForm();
                        }}
                    >
                        Click Here
                    </a>
                </div>
                <div className="py-3">
                    {!isSignUp && (
                        <>
                            <span>Forgot Password?</span>
                            <a
                                className="cursor-pointer ml-2"
                                href="#"
                                onClick={() => {
                                    navigate(RoutePaths.FORGOT_PASSWORD);
                                }}
                            >
                                Click Here
                            </a>
                        </>
                    )}
                </div>
                <div className="py-3">
                    {!isSignUp && (
                        <>
                            <button onClick={loginWithGoogle}>
                                Login With Google
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};