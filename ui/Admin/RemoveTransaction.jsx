import React from "react";
import { Meteor } from "meteor/meteor";
import { useAlert } from 'meteor/quave:alert-react-tailwind';

export const RemoveTransaction = () => {
    const { openAlert } = useAlert();
    const [transactionId, setTransactionId] = React.useState("");

    const removeTransaction = () => {
        Meteor.call('transaction.remove', transactionId, (errorResponse) => {
            if (errorResponse) {
                console.log(errorResponse);
                openAlert(errorResponse.reason);
            }
            else {
                setTransactionId("");
                openAlert("The transaction removed!");
            }
        })
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="px-3 py-2 text-lg text-base font-medium">Remove Transaction</h3>

            <form className="mt-6">
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                            Transaction ID
                        </label>
                        <input
                            type="transactionId"
                            id="transactionId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-around px-2 py-3 text-right">
                    <button
                        type="button"
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        onClick={removeTransaction}
                    >
                        Remove
                    </button>
                </div>
            </form>
        </div>
    );
}