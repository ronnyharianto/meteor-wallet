import React from "react";
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

export const NotificationState = {
    HIDE: 0,
    SUCCESS: 1,
    ERROR: 2
}

export const NotificationAlert = ({ message, state }) => {
    if (state == NotificationState.SUCCESS) {
        return (
            <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">{message}</p>
                    </div>
                </div>
            </div>
        )
    }
    else if (state == NotificationState.ERROR) {
        return (
            <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{message}</h3>
                    </div>
                </div>
            </div>
        )
    }
}