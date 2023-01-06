import React from "react";
import { Modal } from "./Components/Modal";
import { SelectContact } from "./Components/SelectContact";
import { Loading } from "../Components/Loading";
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { ContactCollection } from "../../api/Contacts/ContactCollection";
import { Meteor } from "meteor/meteor"
import { WalletCollection } from "../../api/Wallets/WalletCollection";

export const Wallet = () => {
    const isLoadingContacts = useSubscribe('contacts');
    const contacts = useFind(() => ContactCollection.find({}, { sort: { createdAt: -1 } }));

    const isLoadingWallets = useSubscribe('wallets');
    const wallet = useFind(() => WalletCollection.find())[0];

    const [open, setOpen] = React.useState(false);
    const [isTransferring, setIsTransferring] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [destinationWallet, setDestinationWallet] = React.useState({});
    const [errorMessage, setErrorMessage] = React.useState("");

    const openModal = (isTransferring) => {
        setIsTransferring(isTransferring);
        setOpen(true);
        setErrorMessage("");
        setDestinationWallet({});
        setAmount(0);
    }

    const addTransaction = () => {
        Meteor.call("transaction.insert", {
            isTransferring: isTransferring,
            sourceWalletId: wallet._id,
            destinationWalletId: destinationWallet?.walletId || null,
            amount: Number(amount)
        }, (errorResponse) => {
            if (errorResponse) {
                console.log(errorResponse);
                setErrorMessage(errorResponse.message);
            }
            else {
                setOpen(false);
            }
        });
    }

    if (isLoadingContacts() || isLoadingWallets()) {
        return <Loading />
    }

    return (
        <>
            <div className="flex font-sans shadow-md my-10">
                <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <div className="w-full flex-none text-sm font-medium text-gray-500">
                            Main Account
                        </div>
                        <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                            Wallet ID:
                        </div>
                        <h1 className="flex-auto text-lg font-semibold text-gray-700">
                            {wallet._id}
                        </h1>
                        <div className="text-lg font-semibold text-gray-700">
                            {`${wallet.balance} ${wallet.currency}`}
                        </div>
                    </div>
                    <div className="flex space-x-4 text-sm font-medium">
                        <div className="flex-auto flex space-x-4 mt-4">
                            <button
                                type="button"
                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                onClick={() => {
                                    openModal(false);
                                }}
                            >
                                Add Money
                            </button>
                            <button
                                type="button"
                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                onClick={() => {
                                    openModal(true);
                                }}
                            >
                                Transfer Money
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                title={
                    isTransferring ? 'Transfer money to other wallet' : 'Add money to your wallet'
                }
                body={
                    <>
                        {isTransferring && (
                            <div className="mt-2">
                                <SelectContact
                                    title="Destination Contact"
                                    contact={destinationWallet}
                                    setContact={setDestinationWallet}
                                    contacts={contacts}
                                />
                            </div>
                        )}
                        <div className="mt-2">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="0.00"
                            />
                        </div>
                    </>
                }
                footer={
                    <button
                        type="button"
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        onClick={addTransaction}
                    >
                        {isTransferring ? "Trasnfer" : "Add"}
                    </button>
                }
                errorMessage={errorMessage}
            />
        </>
    )
}