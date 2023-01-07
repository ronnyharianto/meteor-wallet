import React from "react";
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate, useParams } from "react-router";
import { NotificationAlert, NotificationState } from "../Components/NotificationAlert";
import { RoutePaths } from "../../infra/RoutePaths";

export const ResetPassword = () => {
    const { openAlert } = useAlert();
    const { token } = useParams();
    const [password, setPassword] = React.useState("");
    const [notificationMessage, setNotificationMessage] = React.useState("");
    const [notificationState, setNotificationState] = React.useState(NotificationState.HIDE);
    const navigate = useNavigate();

    const resetPassword = () => {
        Accounts.resetPassword(token, password, (errorResponse) => {
            if (errorResponse) {
                openAlert(errorResponse.reason);
            }
            else {
                setPassword("");
                openAlert("Link for reset password has been sent");
            }
        })
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="px-3 py-2 text-lg text-base font-medium">Forgot Password</h3>

            <form className="mt-6">
                <NotificationAlert message={notificationMessage} state={notificationState} />
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
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
                        onClick={resetPassword}
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}