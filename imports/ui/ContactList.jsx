import React, { memo } from "react";
import { ContactCollection } from "../api/ContactCollection";
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { ContactItem } from "./ContactItem.jsx";

export const ContactList = () => {
    const isLoading = useSubscribe('contacts');
    const contacts = useFind(() => ContactCollection.find({}, { sort: { createdAt: -1 } }));

    if (isLoading()) {
        return <p>Loading....</p>
    }

    return (
        <div>
            <div className="mt-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Contact List
                </h3>
                <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                    {contacts.map((contact) => (
                        <ContactItem contact={contact}></ContactItem>
                    ))}
                </ul>
            </div>
        </div>
    )
}